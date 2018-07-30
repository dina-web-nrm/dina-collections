const formatModelItemResponse = require('./formatModelItemResponse')

module.exports = function formatModelItemsResponse({ input }) {
  if (!(input && input.length)) {
    return []
  }
  return input.map(responseItem => {
    return formatModelItemResponse({ input: responseItem }).item
  })
}
