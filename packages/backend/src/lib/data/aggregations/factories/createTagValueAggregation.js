const objectPath = require('object-path')
const createRegexpElasticFilters = require('../../filters/utilities/createRegexpElasticFilters')

module.exports = function createTagValueAggregation({
  description,
  fieldPath,
  resource,
}) {
  const tagValuePath = `${fieldPath}.tagValue`
  const tagTypePath = `${fieldPath}.tagType`
  const tagKeyPath = `${fieldPath}.key`
  const tagTextPath = `${fieldPath}.tagText`

  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ input = {} }) => {
      const { tagTypes, tagValue, limit = 10 } = input

      const keyAggregation = {
        tagKeys: {
          aggs: {
            tagText: {
              terms: {
                field: tagTextPath,
                size: 1,
              },
            },
            tagType: {
              terms: {
                field: tagTypePath,
                size: 1,
              },
            },
            tagValue: {
              terms: {
                field: tagValuePath,
                size: 1,
              },
            },
          },
          terms: {
            field: tagKeyPath,
            size: limit,
          },
        },
      }

      let aggregationFilter = {}

      const bool = {
        must: [],
        should: [],
      }

      if (tagTypes) {
        tagTypes.forEach(tagType => {
          bool.should.push({
            term: {
              [tagTypePath]: tagType,
            },
          })
        })
      }

      if (tagValue) {
        const tagValueFilters = createRegexpElasticFilters({
          path: tagValuePath,
          value: tagValue,
        })
        bool.must = [...bool.must, ...tagValueFilters]
      }

      aggregationFilter = {
        bool,
      }

      if (!Object.keys(aggregationFilter).length) {
        aggregationFilter = {
          match_all: {},
        }
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
      const rootBuckets =
        objectPath.get(result, `aggregations.${key}.filter.tagKeys.buckets`) ||
        []

      return rootBuckets.map(rootBucket => {
        const {
          doc_count, // eslint-disable-line
          tagText: tagTextBuckets,
          tagType: tagTypeBuckets,
          tagValue: tagValueBuckets,
        } = rootBucket
        const tagText = tagTextBuckets.buckets[0].key
        const tagType = tagTypeBuckets.buckets[0].key
        const tagValue = tagValueBuckets.buckets[0].key.trim()

        return {
          count: doc_count,
          key: `${tagType}-${tagValue}`,
          tagText,
          tagType,
          tagValue,
          type: resource,
        }
      })
    },
    inputSchema: {
      type: 'object',
    },
    resource,
  }
}
