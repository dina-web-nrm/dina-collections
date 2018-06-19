/* eslint-disable no-underscore-dangle */

module.exports = function extractMetaFromResult({ result = {} }) {
  const { took } = result
  const hits = result.hits || {}

  return {
    nResponseItems: hits && hits.hits && hits.hits.length,
    nTotalItems: hits.total,
    queryTime: took,
  }
}
