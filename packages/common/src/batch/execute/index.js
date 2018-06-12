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
  deattach,
  execute,
  maxCount,
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
    count,
    createBatch,
    createEntry,
    numberOfBatchEntries,
  }).then(batchData => {
    const nItemsInBatch = batchData !== undefined ? batchData.length : undefined
    return execute(batchData).then(() => {
      return nextTickPromise(deattach).then(() => {
        return runBatch({
          count: count + numberOfBatchEntries,
          createBatch,
          createEntry,
          deattach,
          execute,
          nItemsLastBatch: nItemsInBatch,
          numberOfEntries,
          numberOfEntriesEachBatch,
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
  numberOfEntries,
  numberOfEntriesEachBatch,
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
    numberOfEntries,
    numberOfEntriesEachBatch,
  })
}
