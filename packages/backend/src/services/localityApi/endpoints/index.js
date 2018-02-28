const createResource = require('../../../lib/resourceFactory')
const { create, getMany, getOne, update } = require('../../../operations')

const createRequestSuccess = require('./curatedLocality/examples/requestSuccess.json')

module.exports = createResource({
  basePath: '/api/locality/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createRequestSuccess },
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
  resource: 'curatedLocality',
  resourcePlural: 'curatedLocalities',
})
