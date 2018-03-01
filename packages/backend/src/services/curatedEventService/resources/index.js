const createResource = require('../../../lib/services/resourceFactory')
const createRequestSuccess = require('./createExpedition/examples/requestSuccess.json')

exports.expedition = createResource({
  basePath: '/api/curatedEvent/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      type: 'update',
    },
    {
      type: 'getMany',
    },
  ],
  resource: 'expedition',
})
