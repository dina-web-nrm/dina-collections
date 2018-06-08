const cacheResources = require('../../cacheResources')
const coreToNested = require('common/src/formatObject/coreToNested')
const mapSync = require('common/src/search/map/sync')
const searchSpecimenMapFunctions = require('common/src/search/resources/specimen/mapFunctions')

const mapFunctions = Object.keys(searchSpecimenMapFunctions).map(key => {
  return searchSpecimenMapFunctions[key]
})

const resourceCacheMap = cacheResources.reduce((obj, { name, srcResource }) => {
  return {
    ...obj,
    [srcResource]: name,
  }
}, {})

const warmViews = cacheResources.map(({ name }) => {
  return name
})

const resource = 'searchSpecimen'

const mapFunction = ({ items, serviceInteractor }) => {
  const getItemByTypeId = (type, id) => {
    const cacheResource = resourceCacheMap[type]
    if (resourceCacheMap[type]) {
      const res = serviceInteractor.getOneSync({
        request: {
          pathParams: {
            id,
          },
        },
        resource: cacheResource,
        sync: true,
      })
      // console.log('res', res)
      return res
    }

    return null
  }

  const nestedItems = items.map(item => {
    return coreToNested({
      getItemByTypeId,
      item,
      type: 'specimen',
    })
  })

  const mappedItems = mapSync({
    items: nestedItems,
    mapFunctions,
  })
  return mappedItems.map(item => {
    return { doc: item, id: item.id }
  })
}

module.exports = {
  basePath: '/api/search/v01',
  operations: [
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
    {
      mapFunction,
      srcResource: 'specimen',
      type: 'rebuildView',
      warmViews,
    },
  ],
  resource,
}
