const createDistinguishedUnitObservationTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/curatedListApi/v01',
  operations: [
    {
      exampleRequests: {
        primary: createDistinguishedUnitObservationTypeRequestSuccess,
      },
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

  resource: 'distinguishedUnitObservationType',
}
