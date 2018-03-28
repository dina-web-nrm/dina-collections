const buildWhere = require('./operations/getMany/buildWhere.js')
const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      connect: true,
      exampleRequests: { primary: createTaxonRequestSuccess },
      type: 'create',
    },
    {
      connect: true,
      type: 'update',
    },
    {
      connect: true,
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    {
      connect: true,
      includeRelations: true,
      operationId: 'getTaxonById',
      type: 'getOne',
    },
    {
      buildWhere,
      connect: true,
      includeRelations: true,
      operationId: 'getTaxaByName',
      queryParams: {
        'filter[name]': {
          description:
            'Taxon name - accepted scientific, synonym or vernacular name',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
      type: 'getMany',
    },
  ],
  relations: {
    children: {
      format: 'array',
      resource: 'taxon',
    },
    parent: {
      format: 'object',
      resource: 'taxon',
    },
  },
  resource: 'taxon',
  resourcePlural: 'taxon',
}
