module.exports = function formatItemResponse(item) {
  return {
    document: item,
    id: item.id,
  }
}
