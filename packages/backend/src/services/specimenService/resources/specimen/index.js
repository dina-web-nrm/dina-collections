const normalizedRequestSuccess = require('./operations/create/examples/normalizedRequestSuccess.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')
const getManyfilters = require('./operations/getMany/filters')

module.exports = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: normalizedRequestSuccess },
      type: 'create',
      validateBody,
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filters: getManyfilters,
      includeRelations: true,
      type: 'getMany',
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      type: 'update',
    },
    {
      type: 'del',
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
