module.exports = function bulkCreate({ items, models, type }) {
  return Promise.resolve().then(() => {
    const model = models[type]
    if (!model) {
      throw new Error(`No model found for type: ${type}`)
    }

    return model.bulkCreate(items)
  })
}
