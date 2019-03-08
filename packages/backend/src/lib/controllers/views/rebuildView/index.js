const { execute: batchExecute } = require('common/src/batch')
const createControllerWrapper = require('../../utilities/wrapper')
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
const createGlobals = require('../../../data/transformations/utilities/createGlobals')
const createServiceInteractorCache = require('../../../serviceInteractor/cache')

const log = createLog('lib/controllers/views/rebuildView/rebuild')

module.exports = function rebuildView(options) {
  const { models, operation, serviceInteractor, fileInteractor } = options

  const {
    transformationSpecification: {
      cacheRequestsToResources,
      collidingIdPrefix,
      createBatchFunction = defaultCreateBatchFunction,
      defaultLimit = 10000,
      executeFunction = defaultExecuteFunction,
      globalDecorators = [],
      numberOfEntriesEachBatch = 1000,
      postTransformationFunction = defaultPostTransformationFunction,
      preTransformationFunction = defaultPreTransformationFunction,
      resolveRelations,
      resourceCacheMap,
      srcFileName,
      srcRelationships = ['all'],
      srcResource,
      storeResourceActivity = false,
      transformationFunction = applyTransformations,
      transformationFunctions = defaultTransformationFunctions,
      warmViews,
    } = {},
    resource,
  } = operation

  if (!srcResource && !srcFileName) {
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
    const { queryParams: { limit = defaultLimit, force = true } = {} } = request
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
        resource,
        serviceInteractor,
        storeResourceActivity,
      })
    }

    reporter.start()
    return model
      .synchronize({ force })
      .then(() => {
        log.scope().info(`warming views for ${resource}`)
        return createGlobals({
          globalDecorators,
          serviceInteractor,
        }).then(globals => {
          const wrapperTransformationFunction = ({ startCount, items }) => {
            return transformationFunction({
              globals,
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
              fileInteractor,
              serviceInteractor: serviceInteractorCache,
              srcFileName,
              srcRelationships,
              srcResource,
              transformationFunction: wrapperTransformationFunction,
            })
          }

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

                if (model.swap) {
                  return model.swap().then(() => {
                    return {
                      item: {
                        attributes: reporter.getReport(),
                        id: '1',
                        type: 'customObject',
                      },
                    }
                  })
                }
                return {
                  item: {
                    attributes: reporter.getReport(),
                    id: '1',
                    type: 'customObject',
                  },
                }
              })
            })
          })
        })
      })
      .catch(err => {
        if (model.swap) {
          return model.swap({ err }).then(() => {
            throw err
          })
        }
        throw err
      })
  })
}
