module.exports = function execute({ model, items }) {
  const filteredItems = items.filter(item => !!item)
  return model.bulkCreate({ items: filteredItems }).then(() => {
    return filteredItems
  })
}
