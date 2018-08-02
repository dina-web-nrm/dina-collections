const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./create/examples/requestSuccess.json')
const getManyFilterSpecificationMap = require('./getMany/filters')

module.exports = {
  basePath: '/api/locality/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      queryParams: {
        relationships: {
          description: 'Add relationships. example [descendants, children]',
          required: false,
          schema: {
            items: {
              enum: ['descendants', 'children'],
              type: 'string',
            },
            type: 'array',
          },
        },
      },
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecificationMap,
      includeRelations: true,
      type: 'getMany',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },

    {
      relationKey: 'children',
      type: 'getRelationship',
    },
    {
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'parent',
        resource: 'taxonName',
      }),
      relationKey: 'children',
      type: 'updateRelationship',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      relationKey: 'parent',
      type: 'updateRelationship',
    },
  ],
  resource: 'place',
}
