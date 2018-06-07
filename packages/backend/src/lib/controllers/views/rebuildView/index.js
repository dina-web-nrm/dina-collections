const rebuild = require('./rebuild')

module.exports = function rebuildView({
  operation,
  models,
  serviceInteractor,
}) {
  const {
    mapFunction,
    resource,
    // resourceCacheMap,
    srcResource,
    // warmCache,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!mapFunction) {
    throw new Error(`Map function not provided for ${resource}`)
  }

  return () => {
    return rebuild({
      mapFunction,
      model,
      nItemsEachBatch: 1000,
      serviceInteractor,
      srcResource,
    })
  }
}
