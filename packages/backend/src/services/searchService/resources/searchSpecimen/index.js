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

const selectableFields = ['id', 'attributes.result']

const sortSpecification = {
  fields: ['attributes.idNumeric', 'attributes.result.catalogNumber'],
}

module.exports = {
  basePath: '/api/search/v01',
  operations: [
    {
      selectableFields,
      type: 'getOne',
    },
    {
      aggregationSpecification,
      filterSpecification: queryFilterSpecification,
      selectableFields,
      sortSpecification,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      filterSpecification: getManyFilterSpecification,
      selectableFields,
      sortSpecification,
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
