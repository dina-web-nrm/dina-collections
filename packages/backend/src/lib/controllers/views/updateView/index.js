const applyTransformationFunctions = require('../../../data/transformations/utilities/applyTransformationFunctions')
const update = require('./update')
const defaultMapFunction = require('../utilities/defaultMapFunction')

module.exports = function updateView({ operation, models, serviceInteractor }) {
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

  if (!srcResource) {
    throw new Error(`srcResource not provided for ${srcResource}`)
  }

  return ({ request = {} }) => {
    const { body } = request
    const { data: { attributes: { ids } = {} } = {} } = body
    if (!ids && ids.length) {
      throw new Error('Ids required')
    }

    return update({
      ids,
      mapFunction,
      model,
      serviceInteractor,
      srcResource,
      warmViews,
    })
  }
}
