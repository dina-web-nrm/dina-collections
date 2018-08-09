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
      cacheRequestsToResources,
      collidingIdPrefix,
      createBatchFunction = defaultCreateBatchFunction,
      executeFunction = defaultExecuteFunction,
      numberOfEntriesEachBatch = 1000,
      postTransformationFunction = defaultPostTransformationFunction,
      preTransformationFunction = defaultPreTransformationFunction,
      resolveRelations,
      resourceCacheMap,
      srcFileName,
      srcRelationships = ['all'],
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

  return ({ request = {} } = {}) => {
    const { queryParams: { limit = 10000 } = {} } = request
    const reporter = createReporter()
    const serviceInteractorCache = cacheRequestsToResources
      ? createServiceInteractorCache({
          cacheRequestsToResources,
          serviceInteractor,
        })
      : serviceInteractor

    const wrapperExecute = items => {
      return executeFunction({
        collidingIdPrefix,
        items,
        model,
        models,
        reporter,
      })
    }

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
        srcRelationships,
        srcResource,
        transformationFunction: wrapperTransformationFunction,
      })
    }

    reporter.start()
    return model.synchronize({ force: true }).then(() => {
      log.scope().info(`warming views for ${resource}`)
      return rebuildCacheViews({
        serviceInteractor,
        views: warmViews,
      }).then(dependencyReport => {
        log.scope().info(`Start: migrate data for ${resource}`)
        return batchExecute({
          createBatch: wrappedBatchFunction,
          execute: wrapperExecute,
          numberOfEntries: limit,
          numberOfEntriesEachBatch,
          reporter,
        }).then(() => {
          log.scope().info(`Done: migrate data for ${resource}`)
          return emptyCacheViews({
            serviceInteractor,
            views: warmViews,
          }).then(() => {
            reporter.done()
            if (cacheRequestsToResources) {
              serviceInteractorCache.emptyCache()
            }
            reporter.rebuildViewDependencyReport({
              dependencyReport,
            })

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
