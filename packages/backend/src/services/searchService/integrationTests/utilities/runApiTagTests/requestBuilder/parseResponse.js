/* eslint-disable camelcase */

module.exports = function parseResponse({
  aggregationType,
  res,
  resource,
  testCase,
}) {
  const { aggregate = true, raw } = testCase
  if (!raw) {
    return res
  }

  if (aggregate) {
    if (aggregationType === 'tagValues') {
      return {
        data:
          res.meta.aggregations[resource].filter.tagKeys.buckets.map(
            ({ doc_count, key: rawKey, tagType: tagTypeSection }) => {
              const delimiter = 'ddaadd'
              const keySections = rawKey.split(delimiter)
              const tagValue = keySections[1]
              const key = keySections.join('-')

              const tagType = tagTypeSection.buckets[0].key
              return {
                attributes: {
                  count: doc_count,
                  key,
                  tagType,
                  tagValue,
                  type: resource,
                },
                id: key,
                type: 'customObject',
              }
            }
          ) || [],
      }
    }
    if (aggregationType === 'tagTypes') {
      return {
        data:
          res.meta.aggregations[resource].filter.tagType.buckets.map(
            ({ doc_count, key }) => {
              return {
                attributes: {
                  count: doc_count,
                  key,
                  tagType: key,
                  type: resource,
                },
                id: key,
                type: 'customObject',
              }
            }
          ) || [],
      }
    }

    throw new Error(`Unknown aggregationType: ${aggregationType}`)
  }

  // console.log('parseResponse - res', JSON.stringify(res, null, 2))
  return {
    data:
      res.meta.hits.hits.map(({ _source: item }) => {
        return item
      }) || [],
  }
}
