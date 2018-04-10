const normalizedRequestSuccess = require('./operations/create/examples/normalizedRequestSuccess.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      controller: 'createSpecimen',
      errors: {
        '400': ['REQUEST_BODY_VALIDATION_ERROR'],
      },
      exampleRequests: { primary: normalizedRequestSuccess },
      type: 'create',
      validateBody,
    },
    {
      controller: 'updateSpecimen',
      exampleRequests: { primary: updateRequestSuccess },
      type: 'update',
    },
    {
      relationKey: 'physicalObjects',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'physicalObjects',
      type: 'getRelationHasMany',
    },
    {
      relationKey: 'featureTypes',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'featureTypes',
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
      relationKey: 'taxa',
      type: 'getRelationHasMany',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      controller: 'getManySpecimens',
      includeRelations: true,
      queryParams: {
        'filter[catalogNumber]': {
          description: 'catalog number used to filter specimens',
          example: '123456',
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
    featureTypes: {
      format: 'array',
      resource: 'featureType',
      storeInDocument: true,
    },
    physicalObjects: {
      format: 'array',
      resource: 'physicalObject',
      storeInDocument: true,
    },
    taxa: {
      format: 'array',
      resource: 'taxon',
      storeInDocument: true,
    },
  },
  resource: 'specimen',
}
