const migrations = require('./migrations')
const createRequestSuccess = require('./exampleRequests/createSuccess.json')
const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')
const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./postHooks')

module.exports = {
  model: {
    migrations,
    name: 'physicalObject',
    relations: ['storageLocation'],
    relationships: {
      resourceActivities: {
        inverseRelationshipKey: 'physicalObject',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      specimens: {
        inverseRelationshipKey: 'physicalObjects',
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      storageLocation: {
        keyAllowNull: true,
        keyStoredInModel: 'physicalObject',
        keyType: 'sql',
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
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'count',
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
      relationKey: 'specimens',
      type: 'getRelationship',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelationship',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelationship',
    },
  ],
  resource: 'physicalObject',
}
