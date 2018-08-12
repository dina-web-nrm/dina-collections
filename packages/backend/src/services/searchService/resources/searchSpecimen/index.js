const mappingSpecification = require('./data/mappingSpecification')
const fieldsSpecification = require('./data/fieldsSpecification')
const extractSortableFields = require('../../../../lib/data/fields/utilities/extractSortableFields')
const extractSelectableFields = require('../../../../lib/data/fields/utilities/extractSelectableFields')

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

const sortableFields = extractSortableFields({ fieldsSpecification })
const selectableFields = extractSelectableFields({ fieldsSpecification })

module.exports = {
  basePath: '/api/search/v01',
  model: {
    mappingSpecification,
    modelFactory: 'elasticsearchDocumentModel',
    name: 'searchSpecimen',
  },
  operations: [
    {
      selectableFields,
      type: 'getOne',
    },
    {
      aggregationSpecification,
      filterSpecification: queryFilterSpecification,
      selectableFields,
      sortableFields,
      type: 'query',
    },
    {
      type: 'del',
    },
    {
      filterSpecification: getManyFilterSpecification,
      selectableFields,
      sortableFields,
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
