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
  maxCount,
  count = 0,
  createBatch,
  createEntry,
  execute,
  nItemsLastBatch,
  numberOfEntries,
  numberOfEntriesEachBatch,
}) => {
  if (count >= maxCount) {
    return Promise.reject(new Error('Max count reached'))
  }

  if (numberOfEntries !== undefined) {
    if (count >= numberOfEntries) {
      return Promise.resolve()
    }
  }

  if (nItemsLastBatch !== undefined) {
    if (nItemsLastBatch !== numberOfEntriesEachBatch) {
      return Promise.resolve()
    }
  }

  const numberOfBatchEntries = numberOfEntriesEachBatch
  return internalCreateBatch({
    count,
    createBatch,
    createEntry,
    numberOfBatchEntries,
  }).then(batchData => {
    const nItemsInBatch = batchData !== undefined ? batchData.length : undefined
    return execute(batchData).then(() => {
      return runBatch({
        count: count + numberOfBatchEntries,
        createBatch,
        createEntry,
        execute,
        nItemsLastBatch: nItemsInBatch,
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
  maxCount = 1000000,
  numberOfEntries,
  numberOfEntriesEachBatch,
}) {
  return runBatch({
    createBatch,
    createEntry,
    execute,
    maxCount,
    numberOfEntries,
    numberOfEntriesEachBatch,
  })
}
