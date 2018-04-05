const setup = require('../output/setup.json')
const tableSizes = require('../output/tableSizes.json')

const createAvgTotal = ({ times, numberOfEntries, ...rest }) => {
  const total = times.reduce((agg, item) => {
    return agg + item
  }, 0)
  const avg = total / numberOfEntries
  const batchAvg = total / times.length
  return {
    avg,
    batchAvg,
    total,
    ...rest,
  }
}

const printTimeResult = ({ avg, batchAvg, label, log, tableSize, total }) => {
  log.info(`${label}`)
  log.scope().info(`total: ${total / 1000} s. (${total} ms)`)
  log.scope().info(`avg: ${avg / 1000} s. (${avg} ms)`)
  log.scope().info(`batchAvg: ${batchAvg / 1000} s. (${batchAvg} ms)`)
  if (tableSize) {
    log.scope().info(`externalSize: ${tableSize.externalSize}`)
    log.scope().info(`size: ${tableSize.size}`)
  }
}

module.exports = function createReport(log) {
  const {
    bulkCreate,
    createSampleData,
    numberOfEntries,
    numberOfEntriesEachBatch,
  } = setup
  log.info('Result - setup')
  log.scope().info(`Number of entries: ${numberOfEntries}`)
  log.scope().info(`Number of entries each batch: ${numberOfEntriesEachBatch}`)
  printTimeResult(
    createAvgTotal({
      label: 'createSampleData time',
      log: log.scope(),
      numberOfEntries,
      times: createSampleData,
    })
  )

  printTimeResult(
    createAvgTotal({
      label: 'versionedDocumentModel bulkCreate time',
      log: log.scope(),
      numberOfEntries,
      tableSize: tableSizes.versionedDocumentModels,
      times: bulkCreate.versionedDocumentModel,
    })
  )

  log.info('Result - Size')
}
