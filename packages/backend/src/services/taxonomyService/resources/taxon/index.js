const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'taxon'

module.exports = {
  basePath: '/api/taxonomy/v01',
  operations: [
    {
      exampleRequests: { primary: createTaxonRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'parent',
      type: 'updateRelationHasOne',
    },
    {
      relationKey: 'acceptedTaxonName',
      type: 'updateRelationHasOne',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
      type: 'getMany',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
  resourcePath: 'taxa',
}
