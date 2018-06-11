module.exports = function synchronizeFactory({ Model } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function synchronize({ force = false } = {}) {
    return Model.sync({ force })
  }
}
