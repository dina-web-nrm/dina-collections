const buildWhere = require('./operations/getMany/buildWhere.js')
const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      connect: true,
      exampleRequests: { primary: createTaxonNameRequestSuccess },
      type: 'create',
    },
    {
      connect: true,
      type: 'update',
    },
    {
      connect: true,
      relationKey: 'acceptedToTaxon',
      type: 'updateRelationHasOne',
    },
    {
      connect: true,
      relationKey: 'synonymToTaxon',
      type: 'updateRelationHasOne',
    },
    {
      connect: true,
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationHasOne',
    },
    {
      connect: true,
      includeRelations: true,
      type: 'getOne',
    },
    {
      buildWhere,
      connect: true,
      includeRelations: true,
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
    acceptedToTaxon: {
      format: 'object',
      resource: 'taxon',
    },
    synonymToTaxon: {
      format: 'object',
      resource: 'taxon',
    },
    vernacularToTaxon: {
      format: 'object',
      resource: 'taxon',
    },
  },
  resource: 'taxonName',
}
