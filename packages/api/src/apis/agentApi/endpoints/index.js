const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createRequestSuccess = require('./createAgent/examples/requestSuccess.json')

module.exports = createResource({
  basePath: '/agentApi/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: [createRequestSuccess],
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
  resource: 'agent',
})
