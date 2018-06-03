const specimenFilterFunctions = require('../../specimen/filterFunctions')

const filterFunctionsMap = {
  searchSpecimen: specimenFilterFunctions,
}

const includeItem = require('../includeItem')

module.exports = function filterSync({ items, query, resource }) {
  const filterFunctions = filterFunctionsMap[resource]
  if (!filterFunctions) {
    throw new Error(`No filter functions found for resource: ${resource}`)
  }

  return items
    .filter(item => {
      return includeItem({ filterFunctions, item, query })
    })
    .map(item => {
      return item.id
    })
}
