const createResource = require('../../../lib/resourceFactory')

module.exports = createResource({
  basePath: '/localityApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'updateRelation',
      relationKey: 'belongsTo',
    },
    {
      connect: true,
      operationType: 'getRelation',
      relationKey: 'belongsTo',
    },
    {
      connect: true,
      operationType: 'updateRelation',
      relationKey: 'contains',
    },
    {
      connect: true,
      operationType: 'getRelation',
      relationKey: 'contains',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],
  relations: {
    belongsTo: {
      format: 'object',
      resource: 'curatedLocality',
    },
    contains: {
      format: 'array',
      resource: 'curatedLocality',
    },
  },
  resource: 'curatedLocality',
  resourcePlural: 'curatedLocalities',
})
