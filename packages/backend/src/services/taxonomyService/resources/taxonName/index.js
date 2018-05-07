const buildWhere = require('./operations/getMany/buildWhere.js')
const createTaxonNameRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'taxonName'

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
      type: 'updateRelationBelongsToOne',
    },
    {
      connect: true,
      relationKey: 'synonymToTaxon',
      type: 'updateRelationBelongsToOne',
    },
    {
      connect: true,
      relationKey: 'vernacularToTaxon',
      type: 'updateRelationBelongsToOne',
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
  relations: resourceRelationsMap[resource],
  resource,
}
