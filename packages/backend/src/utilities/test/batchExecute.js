/* eslint-disable no-console */

const internalCreateBatch = ({
  count,
  createBatch,
  createEntry,
  numberOfBatchEntries,
}) => {
  const batchData = []
  if (createBatch) {
    return Promise.resolve(
      createBatch({ numberOfBatchEntries, startCount: count })
    )
  }
  for (let index = 0; index < numberOfBatchEntries; index += 1) {
    batchData[index] = createEntry(count + index)
  }
  return Promise.resolve(batchData)
}

const runBatch = ({
  count = 0,
  createBatch,
  createEntry,
  execute,
  numberOfEntries,
  numberOfEntriesEachBatch,
}) => {
  if (count >= numberOfEntries) {
    return Promise.resolve()
  }

  const numberOfBatchEntries = Math.min(
    numberOfEntries - count,
    numberOfEntriesEachBatch
  )

  return internalCreateBatch({
    count,
    createBatch,
    createEntry,
    numberOfBatchEntries,
  }).then(batchData => {
    return execute(batchData).then(() => {
      return runBatch({
        count: count + numberOfBatchEntries,
        createBatch,
        createEntry,
        execute,
        numberOfEntries,
        numberOfEntriesEachBatch,
      })
    })
  })
}

module.exports = function batchExecute({
  createBatch,
  createEntry,
  execute,
  numberOfEntries,
  numberOfEntriesEachBatch,
}) {
  return runBatch({
    createBatch,
    createEntry,
    execute,
    numberOfEntries,
    numberOfEntriesEachBatch,
  }).catch(err => {
    console.error('Batch failed', err)
  })
}
