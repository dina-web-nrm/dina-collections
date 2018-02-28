const createResource = require('../../../lib/resourceFactory')
const {
  create,
  getMany,
  getOne,
  getRelation,
  getVersions,
  update,
  updateRelation,
  getVersion,
} = require('../../../operations')

const createPhysicalUnitRequestSuccess = require('./physicalUnit/examples/requestSuccess.json')
const createStorageLocationRequestSuccess = require('./storageLocation/examples/requestSuccess.json')

const physicalUnit = createResource({
  basePath: '/api/storage/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createPhysicalUnitRequestSuccess },
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: updateRelation,
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      operation: getRelation,
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      includeRelations: true,
      operation: getOne,
    },
    {
      connect: true,
      includeRelations: true,
      operation: getMany,
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
    storageLocation: {
      format: 'object',
      resource: 'storageLocation',
      type: 'hasOne',
    },
  },
  resource: 'physicalUnit',
})

const storageLocation = createResource({
  basePath: '/api/storage/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createStorageLocationRequestSuccess },
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
      includeRelations: true,
      operation: getOne,
    },
    {
      connect: true,
      includeRelations: true,
      operation: getMany,
    },
  ],
  relations: {
    physicalUnits: {
      format: 'array',
      resource: 'physicalUnit',
    },
  },
  resource: 'storageLocation',
})

module.exports = {
  ...physicalUnit,
  ...storageLocation,
}
