const createResource = require('../../../lib/resourceFactory')

const physicalUnit = createResource({
  basePath: '/storageApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'updateRelation',
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      operationType: 'getRelation',
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],
  relations: {
    storageLocation: {
      format: 'object',
      resource: 'storageLocation',
    },
  },
  resource: 'physicalUnit',
})

const storageLocation = createResource({
  basePath: '/storageApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'updateRelation',
      relationKey: 'physicalUnits',
    },
    {
      connect: true,
      operationType: 'getRelation',
      relationKey: 'physicalUnits',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
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
