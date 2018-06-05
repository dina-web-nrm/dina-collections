const bulkCreate = require('./bulkCreate')
const getCount = require('./getCount')
const truncate = require('./truncate')

const { execute: batchExecute } = require('common/src/batch')

module.exports = function migrateData({
  fromType,
  models,
  nItemsEachBatch = 5000,
  toType,
}) {
  return Promise.resolve().then(() => {
    if (!(fromType === 'stageSpecimen' && toType === 'searchSpecimen')) {
      throw new Error(
        `Not allowed to migrate data from: ${fromType} to ${toType}`
      )
    }
    return getCount({
      models,
      type: 'stageSpecimen',
    }).then(numberOfEntries => {
      if (numberOfEntries === 0) {
        return null
      }
      return truncate({
        models,
        type: 'searchSpecimen',
      }).then(() => {
        return batchExecute({
          createBatch: ({ numberOfBatchEntries, startCount }) => {
            return models.stageSpecimen
              .getWhere({
                limit: numberOfBatchEntries,
                offset: startCount,
                where: {},
              })
              .then(items => {
                return items.map(item => {
                  return {
                    doc: item.document,
                    id: item.id,
                  }
                })
              })
          },
          execute: items => {
            return bulkCreate({
              items,
              models,
              type: 'searchSpecimen',
            })
          },
          numberOfEntries,
          numberOfEntriesEachBatch: nItemsEachBatch,
        }).then(() => {
          return truncate({
            models,
            type: 'stageSpecimen',
          })
        })
      })
    })
  })
}
