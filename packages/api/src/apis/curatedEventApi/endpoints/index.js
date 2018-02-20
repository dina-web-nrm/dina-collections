const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

module.exports = createResource({
  basePath: '/curatedEventApi/v01',
  endpoints: [
    {
      connect: true,
      operation: create,
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: getMany,
    },
  ],
  resource: 'expedition',
})
