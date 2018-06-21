/* eslint-disable no-underscore-dangle, camelcase */

module.exports = function extractMetaFromResult({ result = {} }) {
  const { took, _scroll_id } = result
  const hits = result.hits || {}

  return {
    nResponseItems: hits && hits.hits && hits.hits.length,
    nTotalItems: hits.total,
    queryTime: took,
    scrollId: _scroll_id,
  }
}
