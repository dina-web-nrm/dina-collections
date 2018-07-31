const { execute: batchExecute } = require('common/src/batch')
const rebuildCacheViews = require('./rebuildCacheViews')
const emptyCacheViews = require('./emptyCacheViews')
const createLog = require('../../../../utilities/log')
const createReporter = require('common/src/reporter')
const applyTransformations = require('../../../data/transformations/utilities/applyTransformations')
const defaultCreateBatchFunction = require('./createBatch')
const defaultExecuteFunction = require('./execute')
const defaultTransformationFunctions = require('../utilities/defaultTransformationFunctions')
const defaultPreTransformationFunction = require('../../../data/transformations/utilities/preTransformationCoreToNested')
const defaultPostTransformationFunction = require('../../../data/transformations/utilities/postTransformationNoop')
const createServiceInteractorCache = require('../../../serviceInteractor/cache')

const log = createLog('lib/controllers/views/rebuildView/rebuild')
module.exports = function rebuildView({
  models,
  operation,
  serviceInteractor,
}) {
  const {
    transformationSpecification: {
      createBatchFunction = defaultCreateBatchFunction,
      executeFunction = defaultExecuteFunction,
      postTransformationFunction = defaultPostTransformationFunction,
      preTransformationFunction = defaultPreTransformationFunction,
      resolveRelations,
      resourceCacheMap,
      useServiceInteractorCache = false,
      srcFileName,
      srcResource,
      transformationFunction = applyTransformations,
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

  const wrapperExecute = items => {
    return executeFunction({ items, model, models })
  }

  return ({ request = {} } = {}) => {
    const { queryParams: { limit = 10000 } = {} } = request
    const reporter = createReporter()
    const serviceInteractorCache = useServiceInteractorCache
      ? createServiceInteractorCache({
          serviceInteractor,
        })
      : serviceInteractor

    const wrapperTransformationFunction = ({ startCount, items }) => {
      return transformationFunction({
        items,
        postTransformationFunction,
        preTransformationFunction,
        reporter,
        resolveRelations,
        resourceCacheMap,
        serviceInteractor: serviceInteractorCache,
        srcResource,
        startCount,
        transformationFunctions,
      })
    }

    const wrappedBatchFunction = ({ ...args }) => {
      return createBatchFunction({
        ...args,
        serviceInteractor: serviceInteractorCache,
        srcFileName,
        srcResource,
        transformationFunction: wrapperTransformationFunction,
      })
    }

    reporter.start()
    return model.synchronize({ force: true }).then(() => {
      log.scope().info('warming views')
      return rebuildCacheViews({
        serviceInteractor,
        views: warmViews,
      }).then(() => {
        return batchExecute({
          createBatch: wrappedBatchFunction,
          execute: wrapperExecute,
          numberOfEntries: limit,
          numberOfEntriesEachBatch: 1000,
          reporter,
        }).then(() => {
          log.scope().info('migrate data')
          return emptyCacheViews({
            serviceInteractor,
            views: warmViews,
          }).then(() => {
            reporter.done()
            if (useServiceInteractorCache) {
              serviceInteractorCache.emptyCache()
            }

            return {
              data: {
                attributes: reporter.getReport(),
              },
            }
          })
        })
      })
    })
  }
}
