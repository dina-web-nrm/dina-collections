/* eslint-disable no-underscore-dangle */

module.exports = function extractItemsFromResult({ result }) {
  const hits = result.hits && result.hits.hits
  if (hits) {
    return hits.map(hit => {
      const id = hit._id
      return {
        ...(hit._source || undefined),
        id,
      }
    })
  }
  return []
}
