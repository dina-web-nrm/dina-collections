const transformOutput = require('../../../../lib/controllers/transformations/outputObject')
const batchExecute = require('../../../../utilities/test/batchExecute')

module.exports = function loadInitialData({ sequelizeModels, models }) {
  const { specimen: sequalizeSpecimenModel } = sequelizeModels
  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    return sequalizeSpecimenModel
      .getWhere({
        limit: numberOfBatchEntries,
        offset: startCount,
        where: {},
      })
      .then(items => {
        return items.map(transformOutput)
      })
  }

  return sequalizeSpecimenModel.getCount().then(count => {
    if (count === 0) {
      return null
    }

    const numberOfEntries = count
    const numberOfEntriesEachBatch = 1000
    return batchExecute({
      createBatch,
      execute: items => {
        return models.specimen.bulkCreate(items)
      },
      numberOfEntries,
      numberOfEntriesEachBatch,
    })
  })
}
