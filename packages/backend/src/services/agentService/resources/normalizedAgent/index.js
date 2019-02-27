const migrations = require('./migrations')

const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const createRequestSuccess = require('./exampleRequests/createSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./filterSpecifications')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./postHooks')

const { create: createPreHooks, update: updatePreHooks } = require('./preHooks')

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
      preHooks: createPreHooks,
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
      selectableFields: [
        'id',
        'attributes.agentType',
        'attributes.fullName',
        'attributes.disambiguatingDescription',
      ],
      sortableFields: ['id', 'attributes.name'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      preHooks: updatePreHooks,
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
      relationKey: 'specimens',
      type: 'getRelationship',
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
