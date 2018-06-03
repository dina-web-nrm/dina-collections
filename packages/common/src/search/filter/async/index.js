const specimenFilterFunctions = require('../../specimen/filterFunctions')

const filterFunctionsMap = {
  searchSpecimen: specimenFilterFunctions,
}

const includeItem = require('../includeItem')

module.exports = function filterAsync({
  batchSize = 1000,
  resource,
  items,
  query,
}) {
  const filterFunctions = filterFunctionsMap[resource]
  if (!filterFunctions) {
    throw new Error(`No filter functions found for resource: ${resource}`)
  }
  const nItems = items.length
  const endIndex = nItems - 1
  let currentIndex = 0
  const result = []
  if (!query || !Object.keys(query).length) {
    return Promise.resolve(
      items.map(item => {
        return item.id
      })
    )
  }

  return new Promise((resolve, reject) => {
    const runBatch = () => {
      try {
        const batchEndIndex = currentIndex + batchSize
        while (currentIndex < batchEndIndex) {
          if (currentIndex === endIndex) {
            return resolve(result)
          }

          const item = items[currentIndex]
          if (includeItem({ filterFunctions, item, query })) {
            result.push(item.id)
          }
          currentIndex += 1
        }
      } catch (err) {
        return reject(err)
      }
      setTimeout(() => {
        runBatch()
      }, 0)
      return null
    }

    runBatch()
  })
}
