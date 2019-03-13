/* eslint-disable camelcase */

module.exports = function parseResponse({ res, testCase }) {
  const { aggregate, raw, resource } = testCase
  if (!raw) {
    return res
  }

  if (aggregate) {
    return {
      data: res.meta.aggregations[resource].filter.tagKeys.buckets.map(
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
      ),
    }
  }

  // console.log('parseResponse - res', JSON.stringify(res, null, 2))
  return {
    data: res.meta.hits.hits.map(({ _source: item }) => {
      return item
    }),
  }
}
