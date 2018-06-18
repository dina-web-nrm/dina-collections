const applyTransformationFunctions = require('../../../data/transformations/utilities/applyTransformationFunctions')
const rebuild = require('./rebuild')
const defaultMapFunction = require('../utilities/defaultMapFunction')

module.exports = function rebuildView({
  operation,
  models,
  serviceInteractor,
}) {
  const {
    transformationSpecification: {
      srcResource,
      warmViews,
      resourceCacheMap,
      transformationFunctions,
    } = {},
    resource,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const mapFunction = !transformationFunctions
    ? defaultMapFunction
    : ({ items }) => {
        return applyTransformationFunctions({
          items,
          resourceCacheMap,
          serviceInteractor,
          transformationFunctions,
        })
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
