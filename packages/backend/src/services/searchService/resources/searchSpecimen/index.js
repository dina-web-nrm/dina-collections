const {
  updateView: updateViewTransformationFunction,
  rebuildView: rebuildViewTransformationFunction,
} = require('./data/transformations')

const {
  getMany: getManyFilterSpecifications,
  query: queryFilterSpecifications,
} = require('./data/filters')

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
      filterSpecificationMap: queryFilterSpecifications,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      filterSpecificationMap: getManyFilterSpecifications,
      type: 'getMany',
    },
    {
      type: 'emptyView',
    },
    {
      mapFunction: updateViewTransformationFunction,
      srcResource: 'specimen',
      type: 'updateView',
    },
    {
      mapFunction: rebuildViewTransformationFunction,
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
