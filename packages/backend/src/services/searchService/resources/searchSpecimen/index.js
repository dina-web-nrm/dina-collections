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
      type: 'emptyView',
    },
    {
      mapFunction,
      srcResource: 'specimen',
      type: 'updateView',
    },
    {
      mapFunction,
      srcResource: 'specimen',
      type: 'rebuildView',
      warmViews,
    },
    {
      srcResource: 'specimen',
      type: 'requestRebuildView',
    },
    {
      srcResource: 'specimen',
      type: 'requestUpdateView',
    },
  ],
  resource,
}
