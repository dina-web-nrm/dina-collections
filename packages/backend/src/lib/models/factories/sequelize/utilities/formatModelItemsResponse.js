const formatModelItemResponse = require('./formatModelItemResponse')

module.exports = function formatModelItemsResponse({ idsInMeta, input }) {
  if (!(input && input.length) || idsInMeta) {
    return []
  }
  return input.map(responseItem => {
    return formatModelItemResponse({ input: responseItem }).item
  })
}
