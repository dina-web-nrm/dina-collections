const migrations = require('./migrations')
const {
  getMany: getManyFilterSpecification,
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
    name: 'transaction',
    relations: ['loan'],
    type: 'sequelizeDocumentModel',
  },
  operations: [
    {
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
      relationKey: 'physicalObject',
      type: 'getRelationship',
    },
    {
      relationKey: 'loan',
      type: 'getRelationship',
    },
    {
      relationKey: 'loan',
      type: 'updateRelationship',
    },
  ],
  resource: 'transaction',
}
