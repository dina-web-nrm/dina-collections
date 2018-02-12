/* eslint-disable no-console */

const runBatch = ({
  count = 0,
  createEntry,
  execute,
  numberOfEntries,
  numberOfentriesEachBatch,
}) => {
  if (count >= numberOfEntries) {
    return Promise.resolve()
  }

  const numberOfBatchEntries = Math.min(
    numberOfEntries - count,
    numberOfentriesEachBatch
  )

  const batchIdentifier = `${count}.batch`
  const executeIdentifier = `${batchIdentifier}.execute`

  const batchData = []
  /* eslint-disable no-plusplus */
  for (let index = 0; index < numberOfBatchEntries; index++) {
    batchData[index] = createEntry(count + index)
  }
  /* eslint-enabke no-plusplus */

  console.time(executeIdentifier)
  return execute(batchData).then(() => {
    console.timeEnd(executeIdentifier)
    return runBatch({
      count: count + numberOfBatchEntries,
      createEntry,
      execute,
      numberOfEntries,
      numberOfentriesEachBatch,
    })
  })
}

module.exports = function batchExecute({
  createEntry,
  execute,
  numberOfEntries,
  numberOfentriesEachBatch,
}) {
  console.time('batch')
  return runBatch({
    createEntry,
    execute,
    numberOfEntries,
    numberOfentriesEachBatch,
  })
    .then(() => {
      console.timeEnd('batch')
    })
    .catch(err => {
      console.error('Batch failed', err)
      console.timeEnd('batch')
    })
}
