const coreToNested = require('common/src/formatObject/coreToNested')
const mapSync = require('common/src/search/map/sync')

const resource = 'searchSpecimen'

const getItemByTypeId = () => {
  return null
}

const mapFunction = ({ items, serviceInteractor }) => {
  const nestedItems = items.map(item => {
    return coreToNested({
      getItemByTypeId,
      item,
      type: 'specimen',
    })
  })

  return mapSync({
    items: nestedItems,
    resource: 'searchSpecimen',
  })
}

module.exports = {
  basePath: '/api/specimen/v01',
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
    },
  ],
  resource,
}
