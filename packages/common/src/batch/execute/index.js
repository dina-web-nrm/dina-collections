/* eslint-disable no-console */

const nextTickPromise = deattach => {
  if (!deattach) {
    return Promise.resolve()
  }
  return new Promise(resolve => {
    setTimeout(resolve(), 0)
  })
}

const internalCreateBatch = ({
  batchNumber,
  count,
  createBatch,
  createEntry,
  numberOfBatchEntries,
  reporter,
}) => {
  const batchData = []
  if (createBatch) {
    return Promise.resolve(
      createBatch({
        batchNumber,
        numberOfBatchEntries,
        reporter,
        startCount: count,
      })
    )
  }
  for (let index = 0; index < numberOfBatchEntries; index += 1) {
    batchData[index] = createEntry(count + index)
  }
  return Promise.resolve(batchData)
}

const runBatch = ({
  batchNumber = 0,
  count = 0,
  createBatch,
  createEntry,
  deattach,
  execute,
  maxCount,
  maxNumberOfBatches,
  nItemsLastBatch,
  numberOfEntries,
  numberOfEntriesEachBatch,
  reporter,
}) => {
  if (count >= maxCount) {
    return Promise.reject(new Error('Max count reached'))
  }

  if (batchNumber >= maxNumberOfBatches) {
    return Promise.reject(new Error('Max number of batches reached'))
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

  let numberOfBatchEntries
  if (numberOfEntries === undefined) {
    numberOfBatchEntries = numberOfEntriesEachBatch
  } else {
    numberOfBatchEntries = Math.min(
      numberOfEntriesEachBatch,
      numberOfEntries - count
    )
  }

  return internalCreateBatch({
    batchNumber,
    count,
    createBatch,
    createEntry,
    numberOfBatchEntries,
    reporter,
  }).then(batchData => {
    const nItemsInBatch = batchData !== undefined ? batchData.length : undefined
    return Promise.resolve()
      .then(() => {
        return execute(batchData)
      })
      .then(() => {
        return nextTickPromise(deattach).then(() => {
          return runBatch({
            batchNumber: batchNumber + 1,
            count: count + numberOfBatchEntries,
            createBatch,
            createEntry,
            deattach,
            execute,
            maxNumberOfBatches,
            nItemsLastBatch: nItemsInBatch,
            numberOfEntries,
            numberOfEntriesEachBatch,
            reporter,
          })
        })
      })
  })
}

module.exports = function batchExecute({
  createBatch,
  createEntry,
  deattach = true,
  execute,
  maxCount = 1000000,
  maxNumberOfBatches = 1000,
  numberOfEntries,
  numberOfEntriesEachBatch,
  reporter,
}) {
  if (!(createBatch || createEntry)) {
    throw new Error('createBatch or createEntry is required')
  }

  if (!execute) {
    throw new Error('execute is required')
  }

  return runBatch({
    createBatch,
    createEntry,
    deattach,
    execute,
    maxCount,
    maxNumberOfBatches,
    numberOfEntries,
    numberOfEntriesEachBatch,
    reporter,
  })
}
