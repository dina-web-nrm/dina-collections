const createResource = require('../../../lib/resourceFactory')

const catalogNumber = createResource({
  basePath: '/identifierApi/v01',
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
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],
  resource: 'catalogNumber',
})

module.exports = {
  ...catalogNumber,
}
