const createRequestSuccess = require('./curatedLocality/examples/requestSuccess.json')

exports.curatedLocalities = {
  basePath: '/api/locality/v01',
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
  resource: 'curatedLocality',
  resourcePlural: 'curatedLocalities',
}
