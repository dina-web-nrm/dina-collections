const { batchReduce } = require('../../../batch/reduce')
const includeItem = require('../includeItem')

module.exports = function filterAsync({
  attributesPath = 'attributes',
  batchSize = 100,
  filterFunctions,
  items = [],
  limit,
  offset,
  query,
  returnItems = false,
}) {
  const hasLimit = limit !== undefined
  const hasOffset = offset !== undefined

  const result = []
  const reduceFunction = ({ item }) => {
    if (includeItem({ attributesPath, filterFunctions, item, query })) {
      if (returnItems) {
        result.push(item)
      } else {
        result.push(item.id)
      }
    }
  }

  return batchReduce({
    items,
    numberOfEntriesEachBatch: batchSize,
    reduceFunction,
  }).then(() => {
    if (hasLimit && hasOffset) {
      return result.slice(offset, limit)
    }
    if (hasLimit) {
      return result.slice(0, limit)
    }

    if (hasOffset) {
      return result.slice(offset)
    }

    return result
  })
}
