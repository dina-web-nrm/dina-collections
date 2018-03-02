const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
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
}
