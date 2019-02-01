const createReporter = require('common/src/reporter')
const applyTransformations = require('../../../data/transformations/utilities/applyTransformations')
const update = require('./update')
const defaultPreTransformationFunction = require('../../../data/transformations/utilities/preTransformationCoreToNested')
const defaultPostTransformationFunction = require('../../../data/transformations/utilities/postTransformationNoop')

module.exports = function updateView({ operation, models, serviceInteractor }) {
  const {
    transformationSpecification: {
      postTransformationFunction = defaultPostTransformationFunction,
      preTransformationFunction = defaultPreTransformationFunction,
      resolveRelations,
      resourceCacheMap,
      srcResource,
      transformationFunctions,
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
      return applyTransformations({
        items,
        postTransformationFunction,
        preTransformationFunction,
        reporter,
        resolveRelations,
        resourceCacheMap,
        serviceInteractor,
        srcResource,
        startCount,
        throwError: true,
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
