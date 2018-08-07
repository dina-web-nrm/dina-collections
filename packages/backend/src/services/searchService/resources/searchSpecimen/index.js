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

const fieldsSpecification = {
  fields: ['id', 'attributes.result'],
}

const sortSpecification = {
  fields: ['id', 'idNumeric', 'attributes.result.catalogNumber'],
}

module.exports = {
  basePath: '/api/search/v01',
  operations: [
    {
      fieldsSpecification,
      type: 'getOne',
    },
    {
      aggregationSpecification,
      fieldsSpecification,
      filterSpecification: queryFilterSpecification,
      sortSpecification,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      fieldsSpecification,
      filterSpecification: getManyFilterSpecification,
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
