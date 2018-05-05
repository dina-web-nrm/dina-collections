module.exports = function createFormatSpecifications({ models } = {}) {
  return Object.keys(models).reduce((specifications, modelKey) => {
    const model = models[modelKey]
    if (model['x-format']) {
      return {
        ...specifications,
        [modelKey]: model,
      }
    }
    return specifications
  }, {})
}
