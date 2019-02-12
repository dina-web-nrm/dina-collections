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

const {
  rebuildView: rebuildViewPostHooks,
  updateView: updateViewPostHooks,
} = require('./data/postHooks')

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
    rebuildStrategy: 'swap',
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
      postHooks: updateViewPostHooks,
      queryParams: {
        consolidateJobs: {
          description: 'Will consolidate jobs in postHook',
          schema: {
            default: false,
            type: 'boolean',
          },
        },
      },
      transformationSpecification: updateViewTransformationSpecification,
      type: 'updateView',
    },
    {
      postHooks: rebuildViewPostHooks,
      queryParams: {
        consolidateJobs: {
          description: 'Will consolidate jobs in postHook',
          schema: {
            default: false,
            type: 'boolean',
          },
        },
        force: {
          description:
            'Will rebuild view even if last rebuild ended with error',
          schema: {
            default: true,
            type: 'boolean',
          },
        },
      },
      transformationSpecification: rebuildViewTransformationSpecification,
      type: 'rebuildView',
    },
    {
      type: 'requestRebuildView',
    },
    {
      type: 'requestUpdateView',
    },
    {
      type: 'getViewMeta',
    },
  ],
  resource,
}
