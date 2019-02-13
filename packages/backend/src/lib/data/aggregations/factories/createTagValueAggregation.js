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

const sanitizeInput = input => {
  if (!input) {
    return input
  }
  return input.replace('[', '\\[').replace(']', '\\]')
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

      if (exact) {
        identifierKeyFilter.include = `${sanitizedTagTypes[0]}${delimiter}${
          tagValue
        }`
      } else if (sanitizedTagValue && sanitizedTagTypes) {
        if (sanitizedTagTypes.length === 1) {
          identifierKeyFilter.include = `${sanitizedTagTypes[0]}${
            delimiter
          }[^\\]|\\[]*${sanitizedTagValue.toLowerCase()}.*`
        } else {
          identifierKeyFilter.include = `.*(${sanitizedTagTypes.join('|')})${
            delimiter
          }[^\\]|\\[]*${sanitizedTagValue.toLowerCase()}.*`
        }
      } else if (sanitizedTagValue) {
        identifierKeyFilter.include = `.*${
          delimiter
        }[^\\]|\\[]*${sanitizedTagValue.toLowerCase()}.*`
      } else if (sanitizedTagTypes) {
        identifierKeyFilter.include = `.*${sanitizedTagTypes.join('|')}${
          delimiter
        }.*`
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
