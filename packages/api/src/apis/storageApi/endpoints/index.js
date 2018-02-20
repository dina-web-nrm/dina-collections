const createResource = require('../../../lib/resourceFactory')
const {
  create,
  getMany,
  getOne,
  getRelation,
  update,
  updateRelation,
} = require('../../../operations')

const physicalUnit = createResource({
  basePath: '/storageApi/v01',
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
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      operation: getRelation,
      relationKey: 'storageLocation',
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: getMany,
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
