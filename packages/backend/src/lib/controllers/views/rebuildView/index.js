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
const defaultPostTransformationFunction = require('../../../data/transformations/utilities/postTransformationRemoveNull')

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

  const wrapperTransformationFunction = ({ startCount, items, reporter }) => {
    return transformationFunction({
      items,
      postTransformationFunction,
      preTransformationFunction,
      reporter,
      resolveRelations,
      resourceCacheMap,
      serviceInteractor,
      srcResource,
      startCount,
      transformationFunctions,
    })
  }

  const wrappedBatchFunction = ({ ...args }) => {
    return createBatchFunction({
      ...args,
      serviceInteractor,
      srcFileName,
      srcResource,
      transformationFunction: wrapperTransformationFunction,
    })
  }

  return ({ request = {} } = {}) => {
    const { queryParams: { limit = 10000 } = {} } = request
    const reporter = createReporter()

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
