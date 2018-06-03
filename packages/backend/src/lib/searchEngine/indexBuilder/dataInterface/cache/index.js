module.exports = function createCache({ dataInterface }) {
  const resources = [
    'agent',
    'causeOfDeathType',
    'featureType',
    'preparationType',
    'establishmentMeansType',
    'typeSpecimenType',
    'identifierType',
    'place',
    'storageLocation',
    'physicalObject',
    'taxon',
    'taxonName',
  ]

  let resourceCache = {}

  const addItemsToCache = ({ items, resource }) => {
    resourceCache[resource] = items.reduce((obj, item) => {
      const { id } = item
      obj[id] = item // eslint-disable-line no-param-reassign
      return obj
    }, {})
  }

  const getItemByTypeIdSync = (type, id) => {
    const item = resourceCache[type] && resourceCache[type][id]
    if (item) {
      return item
    }
    return null
  }

  const resetCache = () => {
    resourceCache = {}
    const promises = resources.map(resource => {
      return dataInterface
        .getItems({ type: resource })
        .then(({ data: items }) => {
          addItemsToCache({ items, resource })
          return items
        })
    })
    return Promise.resolve(promises)
  }

  return {
    getItemByTypeIdSync,
    resetCache,
  }
}
