const {
  createSpecimen: createSpecimenControllerFactory,
} = require('./controllers')
const migrations = require('./migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')

const createSuccess = require('./exampleRequests/createSuccess.json')
const updateRequestSuccess = require('./exampleRequests/updateSuccess.json')

const { update: updatePreHooks } = require('./preHooks')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./postHooks')

module.exports = {
  model: {
    migrations,
    name: 'specimen',
    relationships: {
      causeOfDeathTypes: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      establishmentMeansTypes: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      featureTypes: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      identifierTypes: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      normalizedAgents: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      physicalObjects: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      places: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      preparationTypes: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      resourceActivities: {
        inverseRelationshipKey: 'specimen',
        keyStoredInModel: 'resourceActivity',
        keyType: 'polymorphic',
      },
      taxa: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      taxonNames: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
      typeSpecimenType: {
        keyStoredInModel: 'specimen',
        keyType: 'json',
      },
    },
    type: 'sequelizeDocumentModel',
  },
  operations: [
    {
      controllerFactory: createSpecimenControllerFactory,
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
