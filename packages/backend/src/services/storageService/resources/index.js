const createPhysicalUnitRequestSuccess = require('./physicalUnit/examples/requestSuccess.json')
const createStorageLocationRequestSuccess = require('./storageLocation/examples/requestSuccess.json')

exports.physicalUnit = {
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
      type: 'updateRelationHasOne',
    },
    {
      relationKey: 'storageLocation',
      type: 'getRelationHasOne',
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
}

exports.storageLocation = {
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
      type: 'updateRelationHasMany',
    },
    {
      relationKey: 'physicalUnits',
      type: 'getRelationHasMany',
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
}
