const createReporter = require('common/src/reporter')
const createControllerWrapper = require('../../utilities/wrapper')
const applyTransformations = require('../../../data/transformations/utilities/applyTransformations')
const update = require('./update')
const defaultPreTransformationFunction = require('../../../data/transformations/utilities/preTransformationCoreToNested')
const defaultPostTransformationFunction = require('../../../data/transformations/utilities/postTransformationNoop')

module.exports = function updateView(options) {
  const { operation, serviceInteractor } = options

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
  } = operation

  if (!srcResource) {
    throw new Error(`srcResource not provided for ${srcResource}`)
  }

  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: true,
    enablePreHooks: true,
    requiredModelMethods: ['create', 'update', 'del'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
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
        item: {
          data: {
            attributes: reporter.getReport(),
          },
          id: '1',
          type: 'customObject',
        },
      }
    })
  })
}
