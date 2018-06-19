const {
  updateView: updateViewTransformationSpecification,
  rebuildView: rebuildViewTransformationSpecification,
} = require('./data/transformationSpecifications')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

const aggregationSpecification = require('./data/aggregationSpecification')

const resource = 'searchSpecimen'

module.exports = {
  basePath: '/api/search/v01',
  operations: [
    {
      type: 'getOne',
    },
    {
      aggregationSpecification,
      filterSpecification: queryFilterSpecification,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'getMany',
    },
    {
      type: 'emptyView',
    },
    {
      transformationSpecification: updateViewTransformationSpecification,
      type: 'updateView',
    },
    {
      transformationSpecification: rebuildViewTransformationSpecification,
      type: 'rebuildView',
    },
    {
      type: 'requestRebuildView',
    },
    {
      type: 'requestUpdateView',
    },
  ],
  resource,
}
