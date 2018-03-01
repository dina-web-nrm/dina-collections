const createRequestSuccess = require('./catalogNumber/examples/requestSuccess.json')

exports.catalogNumber = {
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
}
