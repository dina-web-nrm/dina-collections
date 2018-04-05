const now = require('performance-now')
const chainPromises = require('common/src/chainPromises')
const writeOutput = require('../utilities/writeOutput')
const batchExecute = require('../../utilities/test/batchExecute')
const createSampleDataFactory = require('./createSampleDataFactory')

module.exports = function loadSampleData({
  log,
  modelName = 'specimen',
  models,
  numberOfEntries = 1000,
  numberOfEntriesEachBatch = 100,
}) {
  const createSampleData = createSampleDataFactory({
    modelName,
  })

  const times = {
    bulkCreate: Object.keys(models).reduce((obj, key) => {
      return {
        ...obj,
        [key]: [],
      }
    }, {}),
    createSampleData: [],
    numberOfEntries,
    numberOfEntriesEachBatch,
  }

  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    log.scope().debug(`Creating data for batch with start count: ${startCount}`)
    const batchData = []
    const createBatchStart = now()
    for (let index = 0; index < numberOfBatchEntries; index += 1) {
      batchData[index] = createSampleData(startCount + index)
    }
    const createBatchDone = now()
    times.createSampleData.push(Math.round(createBatchDone - createBatchStart))
    return batchData
  }

  const execute = batchData => {
    return chainPromises(
      Object.keys(models).map(modelKey => {
        return () => {
          const model = models[modelKey]
          const bulkCreateStart = now()
          return model.bulkCreate(batchData).then(() => {
            const bulkCreateDone = now()
            times.bulkCreate[modelKey].push(
              Math.round(bulkCreateDone - bulkCreateStart)
            )
          })
        }
      })
    )
  }

  return batchExecute({
    createBatch,
    execute,
    numberOfEntries,
    numberOfentriesEachBatch: numberOfEntriesEachBatch,
  }).then(() => {
    writeOutput('setup', times)
    return true
  })
}
