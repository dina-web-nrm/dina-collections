const createFeatureObservationTypeRequestSuccess = require('./featureObservationType/examples/requestSuccess.json')
const createDistinguishedUnitObservationTypeRequestSuccess = require('./distinguishedUnitObservationType/examples/requestSuccess.json')

exports.featureObservationType = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: { primary: createFeatureObservationTypeRequestSuccess },
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
  resource: 'featureObservationType',
}

exports.distinguishedUnitObservationType = {
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
