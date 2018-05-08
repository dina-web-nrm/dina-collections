const transformOutput = require('../../../../lib/controllers/transformations/outputObject')
const batchExecute = require('../../../../utilities/test/batchExecute')

module.exports = function loadInitialData({ sequelizeModels, models }) {
  const { specimen: sequelizeSpecimenModel } = sequelizeModels
  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    return sequelizeSpecimenModel
      .getWhere({
        limit: numberOfBatchEntries,
        offset: startCount,
        where: {},
      })
      .then(items => {
        return items.map(item => transformOutput(item))
      })
  }

  return sequelizeSpecimenModel.getCount().then(count => {
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
