const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createRequestSuccess = require('./createAgent/examples/requestSuccess.json')
const getResponseSuccess = require('./getAgent/examples/responseSuccess.json')

module.exports = createResource({
  basePath: '/api/agent//v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createRequestSuccess },
      operation: create,
    },
    {
      connect: true,
      exampleResponses: { primary: getResponseSuccess },
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
