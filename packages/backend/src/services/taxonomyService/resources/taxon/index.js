const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

const {
  updateRelationshipParent: updateRelationshipParentPreHooks,
} = require('./data/preHooks')

module.exports = {
  basePath: '/api/taxonomy/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'taxon',
    relations: ['taxonName'],
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      postHooks: createPostHooks,
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
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      preHooks: updateRelationshipParentPreHooks,
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
