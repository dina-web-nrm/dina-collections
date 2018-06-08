const rebuild = require('./rebuild')
const defaultMapFunction = require('./defaultMapFunction')

module.exports = function rebuildView({
  operation,
  models,
  serviceInteractor,
}) {
  const {
    mapFunction = defaultMapFunction,
    resource,
    srcResource,
    warmViews,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!mapFunction) {
    throw new Error(`Map function not provided for ${resource}`)
  }

  if (!srcResource) {
    throw new Error(`srcResource not provided for ${srcResource}`)
  }

  return () => {
    return rebuild({
      mapFunction,
      model,
      nItemsEachBatch: 1000,
      serviceInteractor,
      srcResource,
      warmViews,
    })
  }
}
