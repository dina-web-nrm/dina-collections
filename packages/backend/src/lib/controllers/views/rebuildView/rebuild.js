const createLog = require('../../../../utilities/log')
const { execute: batchExecute } = require('common/src/batch')
const rebuildCacheViews = require('./rebuildCacheViews')
const emptyCacheViews = require('./emptyCacheViews')

const defaultLog = createLog('lib/controllers/views/rebuildView/rebuild')

module.exports = function rebuild({
  createBatch,
  log = defaultLog,
  mapFunction,
  srcFileName,
  model,
  nItemsEachBatch = 1000,
  serviceInteractor,
  srcResource,
  warmViews = [],
}) {
  log.info(`rebuild start for src: ${srcResource || srcFileName}`)

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
            srcFileName,
            srcResource,
          }).then(batchItems => {
            return batchItems
          })
        },
        execute: items => {
          const dbItems = items.map(item => {
            // TODO Dont to this transformation here.
            if (item.doc) {
              return item
            }
            const { id, ...rest } = item
            return {
              doc: rest,
              id,
            }
          })
          return model.bulkCreate({ items: dbItems }).then(() => {
            return dbItems
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
