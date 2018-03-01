const createRequestSuccess = require('./createSpecimen/examples/requestSuccess.json')
const fullFormExample = require('./createSpecimen/examples/fullFormExample.json')
const validateBody = require('./createSpecimen/validators/validateBody')
const updateRequestSuccess = require('./updateSpecimen/examples/requestSuccess.json')

exports.specimen = {
  basePath: '/api/specimen/v01',
  operations: [
    {
      connectorOptions: { validateBody },
      exampleRequests: { fullFormExample, primary: createRequestSuccess },
      type: 'create',
    },
    {
      exampleRequests: { primary: updateRequestSuccess },
      type: 'update',
    },
    // {
    //   exampleRequests: { primary: updateRequestSuccess },
    //   relationKey: 'physicalUnits',
    //   type: 'updateRelation',
    // },
    // {
    //   relationKey: 'physicalUnits',
    //   type: 'getRelationHasMany',
    // },
    {
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
        'filter[identifiedTaxonNameStandardized]': {
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
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
    },
  },
  resource: 'specimen',
}
