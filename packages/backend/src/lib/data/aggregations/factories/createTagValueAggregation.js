const computeItemSortWeight = ({ item, input }) => {
  if (!item.tagValue) {
    return 0
  }

  const matchBeginning = item.tagValue.indexOf(input.tagValue) === 0
  if (matchBeginning) {
    return 1
  }
  return -1
}

const buildRegex = ({
  delimiter,
  exact,
  sanitizedTagTypes,
  sanitizedTagValue,
}) => {
  if (exact) {
    return `${sanitizedTagTypes.join('|')}${delimiter}${sanitizedTagValue}`
  }

  const tagValueRegex =
    sanitizedTagValue && `${sanitizedTagValue.toLowerCase()}.*`
  const tagTypesRegex =
    sanitizedTagTypes && `.*(${sanitizedTagTypes.join('|')})`
  const delimiterRegex = delimiter

  if (tagValueRegex && tagTypesRegex) {
    return `${tagTypesRegex}${delimiterRegex}${tagValueRegex}`
  }

  if (sanitizedTagValue) {
    return `(.*?${delimiter}${tagValueRegex})`
  }

  if (sanitizedTagTypes) {
    return `${tagTypesRegex}${delimiter}.*`
  }

  return ''
}

const sanitizeInput = input => {
  if (!input) {
    return input
  }
  return input
    .replace(new RegExp('\\[', 'g'), '\\[')
    .replace(new RegExp('\\]', 'g'), '\\]')
    .replace(new RegExp('\\*', 'g'), '[^\\]|\\[]*')
    .replace(new RegExp(' ', 'g'), '[^\\]|\\[]*')
}

module.exports = function createTagValueAggregation({
  delimiter = 'dddd',
  description,
  fieldPath,
  resource,
}) {
  const keyRawPath = `${fieldPath}.key.raw`

  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ input = {} }) => {
      const { exact, tagTypes, tagValue, limit = 10 } = input
      const identifierKeyFilter = {
        field: keyRawPath,
        size: limit * 2,
      }
      const sanitizedTagValue = sanitizeInput(tagValue)
      const sanitizedTagTypes = tagTypes && tagTypes.map(sanitizeInput)

      const includeRegex = buildRegex({
        delimiter,
        exact,
        sanitizedTagTypes,
        sanitizedTagValue,
      })

      if (includeRegex) {
        identifierKeyFilter.include = includeRegex
      }

      return {
        aggs: {
          tagKeys: {
            terms: identifierKeyFilter,
          },
        },
        nested: {
          path: fieldPath,
        },
      }
    },
    extractItems: ({ key, result, input = {} }) => {
      const { limit = 10 } = input
      const rootAggregations = result.aggregations[key]
      const tagKeys = rootAggregations.tagKeys.buckets
      const items = []
      tagKeys.forEach(tagKey => {
        const sections = tagKey.key.split(delimiter)
        if (sections.length !== 2) {
          throw new Error(`Unexpected sections for: ${tagKey}`)
        }

        const tagType = sections[0]
        const tagValue = sections[1]
        items.push({
          count: tagKey.doc_count,
          key: `${tagType}-${tagValue}`,
          tagType,
          tagValue,
        })
      })

      let sortedResult = items
      if (input.tagValue) {
        sortedResult = items.sort((a, b) => {
          return (
            computeItemSortWeight({
              input,
              item: b,
            }) -
            computeItemSortWeight({
              input,
              item: a,
            })
          )
        })
      }

      return sortedResult.slice(0, limit)
    },
    inputSchema: {
      type: 'object',
    },
    resource,
  }
}
