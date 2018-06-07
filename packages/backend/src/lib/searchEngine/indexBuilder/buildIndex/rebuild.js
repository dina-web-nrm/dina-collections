const createLog = require('../../../../utilities/log')
const { execute: batchExecute } = require('common/src/batch')
const createBatch = require('./createBatch')

const defaultLog = createLog('lib/searchEngine/indexBuilder/indexes/rebuild')

module.exports = function rebuild({
  dataInterface,
  log = defaultLog,
  nItemsEachBatch = 1000,
  searchResource,
  srcResource,
  stageResource,
}) {
  log.info(`rebuild start for src: ${srcResource}`)
  return dataInterface
    .getCount({
      type: srcResource,
    })
    .then(numberOfEntries => {
      if (numberOfEntries === 0) {
        return null
      }
      log.scope().info(`truncate stageResource: ${stageResource}`)
      return dataInterface
        .truncate({
          type: stageResource,
        })
        .then(() => {
          log.scope().info('truncate done')
          log.scope().info('reset cache')
          return dataInterface.resetCache().then(() => {
            log.scope().info('reset cache done')
            log.scope().info(`build stageResource: ${stageResource}`)
            return batchExecute({
              createBatch: ({ ...args }) => {
                return createBatch({
                  ...args,
                  dataInterface,
                  searchResource,
                  srcResource,
                  stageResource,
                })
              },
              execute: items => {
                return dataInterface.bulkCreate({
                  items,
                  type: stageResource,
                })
              },
              numberOfEntries,
              numberOfEntriesEachBatch: nItemsEachBatch,
            }).then(() => {
              log.scope().info(`build stageResource: ${stageResource} done`)
              log.scope().info('migrate data')
              return dataInterface
                .migrateData({
                  fromType: stageResource,
                  toType: searchResource,
                })
                .then(() => {
                  log.scope().info('migrate data done')
                  log.info('rebuild done')
                })
            })
          })
        })
    })
}
