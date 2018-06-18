const mapSync = require('common/src/search/map/sync')
const coreToNested = require('common/src/formatObject/coreToNested')

const getItemByTypeId = ({ type, id, resourceCacheMap, serviceInteractor }) => {
  const cacheResource = resourceCacheMap && resourceCacheMap[type]
  if (cacheResource) {
    return serviceInteractor
      .getOne({
        request: {
          pathParams: {
            id,
          },
        },
        resource: cacheResource,
        sync: true,
      })
      .then(res => {
        return (res && res.data) || null
      })
  }
  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id,
        },
      },
      resource: type,
      sync: true,
    })
    .then(res => {
      return (res && res.data) || null
    })
}

module.exports = function applyTransformationFunctions({
  items,
  resourceCacheMap,
  serviceInteractor,
  transformationFunctions,
}) {
  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId: (type, id) => {
          return getItemByTypeId({
            id,
            resourceCacheMap,
            serviceInteractor,
            type,
          })
        },
        item,
        type: 'specimen',
      })
    })
  ).then(nestedItems => {
    const mappedItems = mapSync({
      items: nestedItems,
      mapFunctions: transformationFunctions,
    })
    return mappedItems.map(item => {
      return { doc: item, id: item.id }
    })
  })
}
