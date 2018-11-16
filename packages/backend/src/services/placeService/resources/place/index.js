const migrations = require('./data/migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

const {
  updateRelationshipParent: updateRelationshipParentPreHooks,
} = require('./data/preHooks')

module.exports = {
  basePath: '/api/locality/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'place',
    relations: ['place'],
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      postHooks: createPostHooks,
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
      sortableFields: ['id', 'attributes.name'],
      type: 'getMany',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.name', 'attributes.group'],
      sortableFields: ['id', 'attributes.name'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
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
        resource: 'place',
      }),
      relationKey: 'children',
      type: 'updateRelationship',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      preHooks: updateRelationshipParentPreHooks,
      relationKey: 'parent',
      type: 'updateRelationship',
    },
  ],
  resource: 'place',
}
