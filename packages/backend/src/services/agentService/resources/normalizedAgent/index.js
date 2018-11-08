const migrations = require('./data/migrations')

const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

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

module.exports = {
  basePath: '/api/agent/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'normalizedAgent',
    relations: ['normalizedAgent'],
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
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.agentType', 'attributes.fullName'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },

    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'user',
      type: 'getRelationship',
    },
    {
      relationKey: 'user',
      type: 'updateRelationship',
    },
  ],
  resource: 'normalizedAgent',
}
