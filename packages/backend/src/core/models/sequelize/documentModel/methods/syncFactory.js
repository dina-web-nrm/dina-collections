module.exports = function syncFactory({ Model } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function sync({ force = false } = {}) {
    return Model.sync({ force })
  }
}
