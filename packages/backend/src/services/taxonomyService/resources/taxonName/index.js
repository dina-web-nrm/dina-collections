const buildWhere = require('./operations/getMany/buildWhere.js')
const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      exampleRequests: { primary: createTaxonNameRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      buildWhere,
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
    {
      type: 'update',
    },
    {
      type: 'del',
    },
    {
      relationKey: 'acceptedToTaxon',
      type: 'getRelationship',
    },
    {
      relationKey: 'acceptedToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'synonymToTaxon',
      type: 'getRelationship',
    },
    {
      relationKey: 'synonymToTaxon',
      type: 'updateRelationship',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'getRelationship',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationship',
    },
  ],
  resource: 'taxonName',
}
