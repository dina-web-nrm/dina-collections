module.exports = function emptyView({ operation, models }) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.empty) {
    throw new Error(`Not allowed to empty resource: ${resource}`)
  }
  return () => {
    return model.empty().then(() => {
      return Promise.resolve({
        data: {},
      })
    })
  }
}
