module.exports = function rebuildView({ operation, models }) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return () => {
    return Promise.resolve({
      data: {},
    })
  }
}
