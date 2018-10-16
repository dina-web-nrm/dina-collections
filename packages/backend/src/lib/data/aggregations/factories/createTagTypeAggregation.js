const objectPath = require('object-path')

module.exports = function createTagValueAggregation({
  description,
  fieldPath,
  resource,
}) {
  const typeRawPath = `${fieldPath}.tagType.raw`

  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ input = {} }) => {
      const { tagType, limit = 10 } = input

      const identifierTypeFilter = {
        field: typeRawPath,
        size: limit,
      }

      if (tagType) {
        identifierTypeFilter.include = `.*${tagType.toLowerCase()}.*`
      }

      return {
        aggs: {
          tagTypes: {
            terms: identifierTypeFilter,
          },
        },
        nested: {
          path: fieldPath,
        },
      }
    },
    extractItems: ({ key, result }) => {
      const tagTypes = objectPath.get(
        result,
        `aggregations.${key}.tagTypes.buckets`
      )
      if (!(tagTypes && tagTypes.length)) {
        return []
      }
      const items = []

      tagTypes.forEach(tagType => {
        items.push({
          count: tagType.doc_count,
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
