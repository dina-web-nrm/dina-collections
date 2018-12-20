/* eslint-disable no-underscore-dangle, camelcase */

module.exports = function extractMetaFromResult({ idsInMeta, result = {} }) {
  const { took, _scroll_id } = result
  const hits = result.hits || {}

  let ids
  if (idsInMeta) {
    if (idsInMeta && result.hits.hits) {
      ids = result.hits.hits.map(hit => {
        return hit._id
      })
    }
  }

  return {
    ids,
    nResponseItems: hits && hits.hits && hits.hits.length,
    nTotalItems: hits.total,
    queryTime: took,
    scrollId: _scroll_id,
  }
}
