const buildWhere = require('./operations/getMany/buildWhere.js')
const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'taxonName'

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      exampleRequests: { primary: createTaxonNameRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'acceptedToTaxon',
      type: 'updateRelationBelongsToOne',
    },
    {
      relationKey: 'synonymToTaxon',
      type: 'updateRelationBelongsToOne',
    },
    {
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationBelongsToOne',
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
  ],
  relations: resourceRelationsMap[resource],
  resource,
}
