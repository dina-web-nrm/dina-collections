const createResource = require('../../../lib/resourceFactory')

module.exports = createResource({
  basePath: '/curatedEventApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],
  resource: 'expedition',
})
