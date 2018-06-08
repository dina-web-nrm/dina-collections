const { Dependor } = require('../../Dependor')
const batchExecute = require('../execute')
const asyncReduce = require('../../asyncReduce')

const dep = new Dependor({
  batchExecute,
})

exports.dep = dep

exports.batchReduce = function batchReduce(
  {
    items = [],
    reduceFunction,
    numberOfEntriesEachBatch = 100,
    initialValue = {},
  } = {}
) {
  if (!reduceFunction) {
    throw new Error('Reduce function is required')
  }

  const nItems = items.length
  let result = initialValue

  const createBatch = ({ numberOfBatchEntries, startCount }) => {
    return items.slice(startCount, startCount + numberOfBatchEntries)
  }

  const execute = batchItems => {
    return asyncReduce({
      initialValue: result,
      items: batchItems,
      reduceFunction,
    }).then(updatedResult => {
      result = updatedResult
    })
  }

  return batchExecute({
    createBatch,
    execute,
    numberOfEntries: nItems,
    numberOfEntriesEachBatch,
  }).then(() => {
    return result
  })
}
