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
      relationKey: 'acceptedTaxonName',
      type: 'updateRelationHasOne',
    },
    {
      connect: true,
      includeRelations: true,
      type: 'getOne',
    },
    {
      connect: true,
      includeRelations: true,
      type: 'getMany',
    },
  ],
  relations: {
    acceptedTaxonName: {
      format: 'object',
      resource: 'taxonName',
    },
    children: {
      format: 'array',
      resource: 'taxon',
    },
    parent: {
      format: 'object',
      resource: 'taxon',
    },
    synonyms: {
      format: 'array',
      resource: 'taxonName',
    },
    vernacularNames: {
      format: 'array',
      resource: 'taxonName',
    },
  },
  resource: 'taxon',
  resourcePath: 'taxa',
}
