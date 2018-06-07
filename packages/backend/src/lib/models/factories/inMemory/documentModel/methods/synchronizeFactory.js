module.exports = function synchronizeFactory({ Model } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function synchronize() {
    return Promise.resolve().then(() => {
      Model.sync()
      Model
    })
  }
}
