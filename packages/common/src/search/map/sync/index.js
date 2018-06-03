const specimenMapFunctions = require('../../specimen/mapFunctions')

const mapFunctionsMap = {
  searchSpecimen: specimenMapFunctions,
}

const applyMapFunctions = ({ item, mapFunctions }) => {
  const target = {}

  Object.keys(mapFunctions).forEach(mapFunctionKey => {
    const mapFunction = mapFunctions[mapFunctionKey]
    mapFunction({ src: item, target })
  })
  return target
}

module.exports = function map({ items, resource }) {
  const mapFunctions = mapFunctionsMap[resource]
  if (!mapFunctions) {
    throw new Error(`No map functions found for resource: ${resource}`)
  }
  return items.map(item => {
    return applyMapFunctions({ item, mapFunctions })
  })
}
