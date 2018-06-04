module.exports = function getCount({ models, type }) {
  return Promise.resolve().then(() => {
    const model = models[type]
    if (!model) {
      throw new Error(`No model found for type: ${type}`)
    }

    return model.getCount()
  })
}
