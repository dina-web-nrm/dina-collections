const migrations = require('./data/migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

const createSuccess = require('./data/exampleRequests/createSuccess.json')
const updateRequestSuccess = require('./data/exampleRequests/updateSuccess.json')

const { update: updatePreHooks } = require('./data/preHooks')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

module.exports = {
  basePath: '/api/specimen/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'specimen',
  },
  operations: [
    {
      controller: 'createSpecimen',
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: createSuccess },
      postHooks: createPostHooks,
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'count',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'query',
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      postHooks: updatePostHooks,
      preHooks: updatePreHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      includeRelations: true,
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      relationKey: 'normalizedAgents',
      type: 'getRelationship',
    },
    {
      relationKey: 'normalizedAgents',
      type: 'updateRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'causeOfDeathTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'establishmentMeansTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'featureTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'identifierTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationship',
    },
    {
      relationKey: 'physicalObjects',
      type: 'updateRelationship',
    },
    {
      relationKey: 'places',
      type: 'getRelationship',
    },
    {
      relationKey: 'places',
      type: 'updateRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'getRelationship',
    },
    {
      relationKey: 'preparationTypes',
      type: 'updateRelationship',
    },
    {
      relationKey: 'taxa',
      type: 'getRelationship',
    },
    {
      relationKey: 'taxa',
      type: 'updateRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'getRelationship',
    },
    {
      relationKey: 'taxonNames',
      type: 'updateRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'getRelationship',
    },
    {
      relationKey: 'typeSpecimenType',
      type: 'updateRelationship',
    },
  ],
  resource: 'specimen',
}
