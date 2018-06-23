const { Dependor } = require('../../Dependor')
const batchExecute = require('../execute')

const dep = new Dependor({
  batchExecute,
})

exports.dep = dep

exports.batchMap = function batchMap(
  { items = [], mapFunction, numberOfEntriesEachBatch = 100 } = {}
) {
  if (!mapFunction) {
    throw new Error('Map function is required')
  }

  const nItems = items.length
  let newItems = []

  let batchStartCount
  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    batchStartCount = startCount
    return items.slice(startCount, startCount + numberOfBatchEntries)
  }

  const execute = batchItems => {
    const promises = batchItems.map((item, index) => {
      return Promise.resolve().then(() => {
        return mapFunction({ batchStartIndex: batchStartCount, index, item })
      })
    })
    return Promise.all(promises).then(mappedBatchItems => {
      newItems = [...newItems, ...mappedBatchItems]
    })
  }

  return batchExecute({
    createBatch,
    execute,
    numberOfEntries: nItems,
    numberOfEntriesEachBatch,
  }).then(() => {
    return newItems
  })
}
