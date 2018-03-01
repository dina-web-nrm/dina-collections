const createResource = require('../../../lib/services/resourceFactory')
const createRequestSuccess = require('./createAgent/examples/requestSuccess.json')
const getResponseSuccess = require('./getAgent/examples/responseSuccess.json')

exports.agent = createResource({
  basePath: '/api/agent//v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      exampleResponses: { primary: getResponseSuccess },
      type: 'getOne',
    },
    {
      type: 'update',
    },
    {
      type: 'getMany',
    },
  ],
  resource: 'agent',
})
