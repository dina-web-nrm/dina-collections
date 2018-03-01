const createResource = require('../../../lib/services/resourceFactory')

const createRequestSuccess = require('./catalogNumber/examples/requestSuccess.json')

exports.catalogNumber = createResource({
  basePath: '/api/identifier/v01',
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      type: 'update',
    },
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
  ],
  resource: 'catalogNumber',
})
