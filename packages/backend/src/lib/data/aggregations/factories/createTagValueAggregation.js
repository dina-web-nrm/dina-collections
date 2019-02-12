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
        size: limit,
      }
      if (exact) {
        identifierKeyFilter.include = `${tagTypes[0]}${delimiter}${tagValue}`
      } else if (tagValue && tagTypes) {
        if (tagTypes.length === 1) {
          identifierKeyFilter.include = `${tagTypes[0]}${
            delimiter
          }${tagValue.toLowerCase()}.*`
        } else {
          identifierKeyFilter.include = `.*(${tagTypes.join('|')})${
            delimiter
          }${tagValue.toLowerCase()}.*`
        }
      } else if (tagValue) {
        identifierKeyFilter.include = `.*${
          delimiter
        }${tagValue.toLowerCase()}.*`
      } else if (tagTypes) {
        identifierKeyFilter.include = `.*${tagTypes}${delimiter}.*`
      }

      identifierKeyFilter.include = identifierKeyFilter.include
        .replace('[', '\\[')
        .replace(']', '\\]')

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
    extractItems: ({ key, result }) => {
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

      return items
    },
    inputSchema: {
      type: 'object',
    },
    resource,
  }
}
