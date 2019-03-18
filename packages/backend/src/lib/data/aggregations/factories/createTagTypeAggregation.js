const objectPath = require('object-path')

module.exports = function createTagTypeAggregation({
  description,
  fieldPath,
  resource,
}) {
  const tagTypePath = `${fieldPath}.tagType.raw`

  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ input = {} }) => {
      const { tagType: tagTypeInput, limit = 10 } = input

      const tagTypes = tagTypeInput ? [tagTypeInput] : []

      const keyAggregation = {
        tagType: {
          terms: {
            field: tagTypePath,
            size: limit,
          },
        },
      }

      let aggregationFilter = {}

      const bool = {
        must: [],
        should: [],
      }

      if (tagTypes && tagTypes.length) {
        tagTypes.forEach(tagType => {
          bool.should.push({
            term: {
              [tagTypePath]: tagType,
            },
          })
        })
      }

      aggregationFilter = {
        bool,
      }

      return {
        aggs: {
          filter: {
            aggs: keyAggregation,
            filter: aggregationFilter,
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
        `aggregations.${key}.filter.tagType.buckets`
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
