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
  model: {
    migrations,
    name: 'storageLocation',
    relations: ['physicalObject'],
    relationships: {
      children: {
        keyAllowNull: true,
        keyStoredInModel: 'storageLocation',
        keyType: 'sql',
      },
      parent: {
        keyAllowNull: true,
        keyStoredInModel: 'storageLocation',
        keyType: 'sql',
      },
      physicalObjects: {
        keyStoredInModel: 'physicalObject',
        keyType: 'sql',
      },
      preparationTypes: {
        keyStoredInModel: 'storageLocation',
        keyType: 'json',
      },
      resourceActivities: {
        inverseRelationshipKey: 'storageLocation',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      taxa: {
        keyStoredInModel: 'storageLocation',
        keyType: 'json',
      },
    },

    type: 'sequelizeDocumentModel',
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
        resource: 'storageLocation',
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
      relationKey: 'physicalObjects',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'storageLocation',
        resource: 'physicalObject',
      }),
      relationKey: 'physicalObjects',
      type: 'updateRelationship',
    },
    {
      relationKey: 'taxa',
      type: 'getRelationship',
    },
  ],
  resource: 'storageLocation',
}
