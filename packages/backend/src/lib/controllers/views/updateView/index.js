const createReporter = require('common/src/reporter')
const applyTransformationFunctions = require('../../../data/transformations/utilities/applyTransformationFunctions')
const update = require('./update')
const defaultTransformationFunctions = require('../utilities/defaultTransformationFunctions')

module.exports = function updateView({ operation, models, serviceInteractor }) {
  const {
    transformationSpecification: {
      resolveRelations,
      resourceCacheMap,
      srcResource,
      transformationFunctions = defaultTransformationFunctions,
      warmViews,
    } = {},
    resource,
  } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
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
    const reporter = createReporter()
    const mapFunction = ({ startCount, items }) => {
      return applyTransformationFunctions({
        items,
        reporter,
        resolveRelations,
        resourceCacheMap,
        serviceInteractor,
        srcResource,
        startCount,
        transformationFunctions,
      })
    }

    reporter.start()

    return update({
      ids,
      mapFunction,
      model,
      serviceInteractor,
      srcResource,
      warmViews,
    }).then(() => {
      reporter.done()
      return {
        data: {
          attributes: reporter.getReport(),
        },
      }
    })
  }
}
