const cacheResources = require('../../cacheResources')
const coreToNested = require('common/src/formatObject/coreToNested')
const mapSync = require('common/src/search/map/sync')

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
    resource: 'searchSpecimen',
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
