module.exports = function createTagValueAggregation({
  description,
  fieldPath,
  resource,
}) {
  const typeRawPath = `${fieldPath}.tagType.raw`
  const valueRawPath = `${fieldPath}.tagValue.raw`

  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ options = {} }) => {
      const { containsTagType, containsTagValue, limit = 10 } = options

      const identifierTypeFilter = {
        field: typeRawPath,
      }

      if (containsTagType) {
        identifierTypeFilter.include = `.*${containsTagType}.*`
      }

      const identifierValueFilter = {
        field: valueRawPath,
        size: limit,
      }

      if (containsTagValue) {
        identifierValueFilter.include = `.*${containsTagValue}.*`
      }

      return {
        aggs: {
          tagTypes: {
            aggs: {
              tagValues: { terms: identifierValueFilter },
            },
            terms: identifierTypeFilter,
          },
        },
        nested: {
          path: fieldPath,
        },
      }
    },
    extractItems: ({ key, result }) => {
      const rootAggregations = result.aggregations[key]

      const tagTypes = rootAggregations.tagTypes.buckets
      const items = []

      tagTypes.forEach(tagType => {
        items.push({
          key: tagType.key,
          tagType: tagType.key,
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
