const createSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: {
        primary: createSuccess,
      },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
  ],

  resource: 'identifierType',
}
