const createReporter = require('common/src/reporter')
const applyTransformationFunctions = require('../../../data/transformations/utilities/applyTransformationFunctions')
const rebuild = require('./rebuild')
const defaultCreateBatch = require('./createBatch')
const defaultTransformationFunctions = require('../utilities/defaultTransformationFunctions')

module.exports = function rebuildView({
  createBatch = defaultCreateBatch,
  models,
  operation,
  serviceInteractor,
}) {
  const {
    transformationSpecification: {
      resolveRelations,
      resourceCacheMap,
      srcFileName,
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

  if (!srcResource && !srcFileName) {
    throw new Error(`srcResource not provided for ${srcResource}`)
  }

  return () => {
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

    return rebuild({
      createBatch,
      mapFunction,
      model,
      nItemsEachBatch: 1000,
      serviceInteractor,
      srcFileName,
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
