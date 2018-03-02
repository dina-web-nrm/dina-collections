const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const getResponseSuccess = require('./operations/getOne/examples/responseSuccess.json')

module.exports = {
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
}
