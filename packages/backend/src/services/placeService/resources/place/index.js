const migrations = require('./migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./exampleRequests/createSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./filterSpecifications')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
  updateInternalRelationship: updateInternalRelationshipPostHooks,
} = require('./postHooks')

const {
  updateRelationshipParent: updateRelationshipParentPreHooks,
} = require('./preHooks')

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
      filterSpecification: getManyFilterSpecification,
      type: 'count',
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
      postHooks: updateInternalRelationshipPostHooks,
      preHooks: updateRelationshipParentPreHooks,
      relationKey: 'parent',
      type: 'updateRelationship',
    },
    {
      relationKey: 'specimens',
      type: 'getRelationship',
    },
    {
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'places',
        resource: 'place',
      }),
      relationKey: 'specimens',
      type: 'updateRelationship',
    },
  ],
  resource: 'place',
}
