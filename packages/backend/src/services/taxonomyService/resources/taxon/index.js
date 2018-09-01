const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createTaxonRequestSuccess = require('./operations/create/examples/requestSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

module.exports = {
  basePath: '/api/taxonomy/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxon',
    relations: ['taxonName'],
  },
  operations: [
    {
      exampleRequests: { primary: createTaxonRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      type: 'getMany',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id'],
      type: 'query',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      relationKey: 'parent',
      type: 'updateRelationship',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      relationKey: 'children',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'parent',
        resource: 'taxon',
      }),
      relationKey: 'children',
      type: 'updateRelationship',
    },
    {
      relationKey: 'acceptedTaxonName',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'acceptedToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'acceptedTaxonName',
      type: 'updateRelationship',
    },
    {
      relationKey: 'synonyms',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'synonymToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'synonyms',
      type: 'updateRelationship',
    },
    {
      relationKey: 'vernacularNames',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'vernacularToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'vernacularNames',
      type: 'updateRelationship',
    },
  ],
  resource: 'taxon',
  resourcePath: 'taxa',
}
