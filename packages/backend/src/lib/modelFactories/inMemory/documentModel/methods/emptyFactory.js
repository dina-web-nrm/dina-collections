module.exports = function emptyFactory({ Model } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function empty() {
    return Promise.resolve().then(() => {
      Model.sync()
    })
  }
}
