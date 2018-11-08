module.exports = function synchronizeFactory({ config, Model } = {}) {
  if (!config) {
    throw new Error('Have to provide config')
  }
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function synchronize({ force = false } = {}) {
    if (!config.db.allowSync) {
      return Promise.resolve()
    }

    return Model.sync({ force })
  }
}
