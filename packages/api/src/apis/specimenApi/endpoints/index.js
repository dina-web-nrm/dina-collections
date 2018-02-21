const createResource = require('../../../lib/resourceFactory')
const {
  create,
  getMany,
  getOne,
  getRelation,
  getVersion,
  getVersions,
  update,
  updateRelation,
} = require('../../../operations')

const specimenGetWhere = require('../connectors/specimenGetWhere')

const createRequestSuccess = require('./createSpecimen/examples/requestSuccess.json')
const fullFormExample = require('./createSpecimen/examples/fullFormExample.json')
const validateBody = require('./createSpecimen/validators/validateBody')
const updateRequestSuccess = require('./updateSpecimen/examples/requestSuccess.json')

const specimen = createResource({
  basePath: '/api/specimen/v01',
  endpoints: [
    {
      connect: true,
      connectorOptions: { validateBody },
      exampleRequests: { fullFormExample, primary: createRequestSuccess },
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      exampleRequests: { primary: updateRequestSuccess },
      operation: updateRelation,
      relationKey: 'physicalUnits',
    },
    {
      connect: true,
      operation: getRelation,
      relationKey: 'physicalUnits',
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      connector: specimenGetWhere,
      operation: getMany,
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
    },
    {
      connect: true,
      operation: getVersion,
    },
    {
      connect: true,
      operation: getVersions,
    },
  ],
  relations: {
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
    },
  },
  resource: 'specimen',
})

module.exports = {
  ...specimen,
}
