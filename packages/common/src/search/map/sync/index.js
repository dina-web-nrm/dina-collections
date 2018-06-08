const applyMapFunctions = ({ item, mapFunctions }) => {
  const target = {}

  mapFunctions.forEach(mapFunction => {
    mapFunction({ src: item, target })
  })
  return target
}

module.exports = function map({ items, mapFunctions }) {
  if (!mapFunctions) {
    throw new Error('No map functions provided')
  }

  if (!Array.isArray(mapFunctions)) {
    throw new Error(`Provide map functions as array`)
  }

  return items.map(item => {
    return applyMapFunctions({ item, mapFunctions })
  })
}
