const objectPath = require('object-path')

module.exports = function createTagTypeAggregation({
  description,
  fieldPath,
  resource,
  tagTypePath = 'tagType',
}) {
  const tagTypesPath = `${tagTypePath}s`
  const typeRawPath = `${fieldPath}.${tagTypePath}.raw`

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
          [tagTypesPath]: {
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
        `aggregations.${key}.${tagTypesPath}.buckets`
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
