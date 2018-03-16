const buildWhere = require('./getMany/buildWhere')

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      connect: true,
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
