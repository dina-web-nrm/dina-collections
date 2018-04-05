/* eslint-disable no-console */

const runBatch = ({
  count = 0,
  createBatch,
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

  let batchData = []
  if (createBatch) {
    batchData = createBatch({ numberOfBatchEntries, startCount: count })
  } else {
    for (let index = 0; index < numberOfBatchEntries; index += 1) {
      batchData[index] = createEntry(count + index)
    }
  }

  return execute(batchData).then(() => {
    return runBatch({
      count: count + numberOfBatchEntries,
      createBatch,
      createEntry,
      execute,
      numberOfEntries,
      numberOfentriesEachBatch,
    })
  })
}

module.exports = function batchExecute({
  createBatch,
  createEntry,
  execute,
  numberOfEntries,
  numberOfentriesEachBatch,
}) {
  return runBatch({
    createBatch,
    createEntry,
    execute,
    numberOfEntries,
    numberOfentriesEachBatch,
  }).catch(err => {
    console.error('Batch failed', err)
  })
}
