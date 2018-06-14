const cacheResourcesSpecifications = require('../../cacheResourcesSpecifications')
const coreToNested = require('common/src/formatObject/coreToNested')
const mapSync = require('common/src/search/map/sync')
const searchSpecimenMapFunctions = require('common/src/search/resources/specimen/mapFunctions')

const mapFunctions = Object.keys(searchSpecimenMapFunctions).map(key => {
  return searchSpecimenMapFunctions[key]
})

const resourceCacheMap = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    return {
      ...obj,
      [srcResource]: name,
    }
  },
  {}
)

exports.updateViewMapFunction = ({ items, serviceInteractor }) => {
  const getItemByTypeId = (type, id) => {
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

  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId,
        item,
        type: 'specimen',
      })
    })
  ).then(nestedItems => {
    const mappedItems = mapSync({
      items: nestedItems,
      mapFunctions,
    })
    return mappedItems.map(item => {
      return { doc: item, id: item.id }
    })
  })
}

exports.rebuildViewMapFunction = ({ items, serviceInteractor }) => {
  const getItemByTypeId = (type, id) => {
    const cacheResource = resourceCacheMap[type]
    if (resourceCacheMap[type]) {
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

    return null
  }

  return Promise.all(
    items.map(item => {
      return coreToNested({
        getItemByTypeId,
        item,
        type: 'specimen',
      })
    })
  ).then(nestedItems => {
    const mappedItems = mapSync({
      items: nestedItems,
      mapFunctions,
    })
    return mappedItems.map(item => {
      return { doc: item, id: item.id }
    })
  })
}
