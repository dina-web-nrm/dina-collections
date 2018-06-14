module.exports = function defaultMapFunction({ items }) {
  return items.map(item => {
    return {
      doc: item.attributes,
      id: item.id,
    }
  })
}
