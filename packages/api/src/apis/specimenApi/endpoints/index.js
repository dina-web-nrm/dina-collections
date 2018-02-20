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

const { specimenGetWhere } = require('../connectors/specimenGetWhere')

const specimen = createResource({
  basePath: '/specimenApi/v01',
  endpoints: [
    {
      connect: true,
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
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
  // createSpecimen,
  // getSpecimen,
  // getSpecimens,
  // getSpecimenVersion,
  // getSpecimenVersions,
  // updateSpecimen,
}
