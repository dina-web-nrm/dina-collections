/* eslint-disable no-underscore-dangle, camelcase */

module.exports = function extractMetaFromResult({ idsInMeta, result = [] }) {
  let ids
  if (idsInMeta) {
    ids = result.map(item => {
      return item.id
    })
  }
  return {
    ids,
    nResponseItems: result.length,
  }
}
