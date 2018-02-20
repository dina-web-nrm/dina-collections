const createResource = require('../../../lib/resourceFactory')
const {
  create,
  getMany,
  getOne,
  getRelation,
  update,
  updateRelation,
} = require('../../../operations')

module.exports = createResource({
  basePath: '/localityApi/v01',
  endpoints: [
    {
      connect: true,
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: updateRelation,
      relationKey: 'belongsTo',
    },
    {
      connect: true,
      operation: getRelation,
      relationKey: 'belongsTo',
    },
    {
      connect: true,
      operation: updateRelation,
      relationKey: 'contains',
    },
    {
      connect: true,
      operation: getRelation,
      relationKey: 'contains',
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: getMany,
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
