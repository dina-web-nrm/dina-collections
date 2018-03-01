const createResource = require('../../../lib/services/resourceFactory')
const createPhysicalUnitRequestSuccess = require('./physicalUnit/examples/requestSuccess.json')
const createStorageLocationRequestSuccess = require('./storageLocation/examples/requestSuccess.json')

exports.physicalUnit = createResource({
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createPhysicalUnitRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'storageLocation',
      type: 'updateRelation',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelation',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
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
    storageLocation: {
      format: 'object',
      resource: 'storageLocation',
      type: 'hasOne',
    },
  },
  resource: 'physicalUnit',
})

exports.storageLocation = createResource({
  basePath: '/api/storage/v01',
  operations: [
    {
      exampleRequests: { primary: createStorageLocationRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      relationKey: 'physicalUnits',
      type: 'updateRelation',
    },
    {
      relationKey: 'physicalUnits',
      type: 'getRelation',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      includeRelations: true,
      type: 'getMany',
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
