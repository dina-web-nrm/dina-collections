const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'taxon'

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
  relations: resourceRelationsMap[resource],
  resource,
  resourcePath: 'taxa',
}
