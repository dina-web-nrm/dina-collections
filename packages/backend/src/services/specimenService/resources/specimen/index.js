const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const fullFormExample = require('./operations/create/examples/fullFormExample.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { fullFormExample, primary: createRequestSuccess },
      type: 'create',
      validateBody,
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      type: 'update',
    },
    {
      relationKey: 'physicalUnits',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'physicalUnits',
      type: 'getRelationHasMany',
    },
    {
      relationKey: 'featureObservationTypes',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'featureObservationTypes',
      type: 'getRelationHasMany',
    },
    {
      relationKey: 'curatedLocalities',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'curatedLocalities',
      type: 'getRelationHasMany',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      controller: 'specimenGetWhere',
      queryParams: {
        'filter[catalogNumber]': {
          description: 'catalog number used to filter specimens',
          example: '123456',
          required: false,
          schema: {
            type: 'string',
          },
        },
        'filter[taxonNameStandardized]': {
          description: 'Standardized taxon name used to filter specimens',
          example: 'Chironectes minimus',
          required: false,
          schema: {
            type: 'string',
          },
        },
      },
      type: 'getMany',
    },
    {
      type: 'getVersion',
    },
    {
      type: 'getVersions',
    },
  ],
  relations: {
    curatedLocalities: {
      format: 'array',
      resource: 'curatedLocality',
      storeInDocument: true,
    },
    featureObservationTypes: {
      format: 'array',
      resource: 'featureObservationType',
      storeInDocument: true,
    },
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
      storeInDocument: true,
    },
  },
  resource: 'specimen',
}
