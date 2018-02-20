const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const catalogNumber = createResource({
  basePath: '/identifierApi/v01',
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
      operation: getOne,
    },
    {
      connect: true,
      operation: getMany,
    },
  ],
  resource: 'catalogNumber',
})

module.exports = {
  ...catalogNumber,
}
