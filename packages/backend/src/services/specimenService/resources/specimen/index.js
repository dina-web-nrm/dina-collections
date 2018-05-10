const normalizedRequestSuccess = require('./operations/create/examples/normalizedRequestSuccess.json')
const validateBody = require('./operations/create/validators/validateBody')
const updateRequestSuccess = require('./operations/update/examples/requestSuccess.json')
const { resourceRelationsMap } = require('../../models/relations')

const resource = 'specimen'

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
      controller: 'updateSpecimen',
      exampleRequests: { primary: updateRequestSuccess },
      type: 'update',
    },
    {
      controller: 'delSpecimen',
      type: 'del',
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
      relationKey: 'places',
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'places',
      type: 'getRelationHasMany',
    },
    {
      relationKey: 'taxa',
      type: 'getRelationHasMany',
    },
  ],
  relations: resourceRelationsMap[resource],
  resource,
}
