module.exports = function execute({ model, items }) {
  return model.bulkCreate({ items }).then(() => {
    return items
  })
}
