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
} = require('./postHooks')

module.exports = {
  basePath: '/api/loan/v01',
  migrations,
  model: {
    name: 'loan',
    relations: ['transaction'],
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
      sortableFields: ['id', 'attributes.recipient'],
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'count',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.recipient', 'attributes.title'],
      sortableFields: ['id', 'attributes.recipient'],
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
      relationKey: 'transactions',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'loan',
        resource: 'transaction',
      }),
      relationKey: 'transactions',
      type: 'updateRelationship',
    },
  ],
  resource: 'loan',
}
