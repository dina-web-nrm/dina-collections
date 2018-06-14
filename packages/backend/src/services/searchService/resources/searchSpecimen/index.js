const {
  updateViewMapFunction,
  rebuildViewMapFunction,
} = require('./mapFunctions')

const createGetManyFilters = require('../../../../lib/services/operationFactory/filters/createGetManyFilters')

const cacheResourcesSpecifications = require('../../cacheResourcesSpecifications')

const warmViews = cacheResourcesSpecifications.map(({ name }) => {
  return name
})

const resource = 'searchSpecimen'

module.exports = {
  basePath: '/api/search/v01',
  operations: [
    {
      type: 'getOne',
    },
    {
      type: 'del',
    },
    {
      filters: createGetManyFilters({
        include: ['ids', 'updatedAfter', 'deactivated'],
      }),
      type: 'getMany',
    },
    {
      type: 'emptyView',
    },
    {
      mapFunction: updateViewMapFunction,
      srcResource: 'specimen',
      type: 'updateView',
    },
    {
      mapFunction: rebuildViewMapFunction,
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
