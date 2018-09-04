const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

module.exports = {
  basePath: '/api/locality/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'place',
    relations: ['place'],
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      selectableFields: ['id', 'attributes.name', 'attributes.group'],
      type: 'getMany',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.name', 'attributes.group'],
      type: 'query',
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
