const createLog = require('../../../../utilities/log')
const { execute: batchExecute } = require('common/src/batch')
const createBatch = require('./createBatch')
const rebuildCacheViews = require('./rebuildCacheViews')
const emptyCacheViews = require('./emptyCacheViews')

const defaultLog = createLog('lib/controllers/views/rebuildView/rebuild')

module.exports = function rebuild({
  log = defaultLog,
  mapFunction,
  model,
  nItemsEachBatch = 1000,
  serviceInteractor,
  srcResource,
  warmViews = [],
}) {
  log.info(`rebuild start for src: ${srcResource}`)

  log.scope().info('truncate stageResource')
  // replace with flush or truncate or whatever
  return model.synchronize({ force: true }).then(() => {
    log.scope().info('truncate done')
    log.scope().info('reset cache')
    // serviceInteractor.resetCache()

    log.scope().info('warming views')
    return rebuildCacheViews({
      serviceInteractor,
      views: warmViews,
    }).then(() => {
      log.scope().info('warming views done')

      log.scope().info('reset cache done')
      return batchExecute({
        createBatch: ({ ...args }) => {
          return createBatch({
            ...args,
            mapFunction,
            serviceInteractor,
            srcResource,
          })
        },
        execute: items => {
          return model.bulkCreate({ items }).then(() => {
            return items
          })
        },
        numberOfEntriesEachBatch: nItemsEachBatch,
      }).then(() => {
        log.scope().info(`build stageResource done`)
        log.scope().info('migrate data')
        return emptyCacheViews({
          serviceInteractor,
          views: warmViews,
        }).then(() => {
          return {
            data: {},
          }
        })
      })
    })
  })
}
