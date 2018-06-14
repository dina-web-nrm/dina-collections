const update = require('./update')
const defaultMapFunction = require('../utilities/defaultMapFunction')

module.exports = function updateView({ operation, models, serviceInteractor }) {
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
