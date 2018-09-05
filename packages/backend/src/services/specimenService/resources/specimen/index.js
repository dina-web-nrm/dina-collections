const {
  getNormalizedColumnNames,
} = require('common/src/formatObject/specifications')

const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

const createSuccess = require('./data/exampleRequests/createSuccess.json')
const updateRequestSuccess = require('./data/exampleRequests/updateSuccess.json')

const { create: createPreHooks } = require('./data/preHooks')

const {
  create: createHooks,
  del: delHooks,
  update: updateHooks,
} = require('./data/hooks')

const normalizedColumnNames = getNormalizedColumnNames('specimen')

module.exports = {
  basePath: '/api/specimen/v01',
  model: {
    modelFactory: 'sequelizeNormalizedDocumentModel',
    name: 'specimen',
    normalizedColumnNames,
  },
  operations: [
    {
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: createSuccess },
      postHooks: createHooks,
      preHooks: createPreHooks,
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
      exampleRequests: { primary: updateRequestSuccess },
      postHooks: updateHooks,
      type: 'update',
    },
    {
      postHooks: delHooks,
      type: 'del',
    },
    {
      includeRelations: true,
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      relationKey: 'agents',
      type: 'getRelationship',
    },
    {
      relationKey: 'agents',
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
