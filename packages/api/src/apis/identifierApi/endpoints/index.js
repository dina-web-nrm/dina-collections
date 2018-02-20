const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createRequestSuccess = require('./catalogNumber/examples/requestSuccess.json')

const catalogNumber = createResource({
  basePath: '/identifierApi/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: [createRequestSuccess],
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
