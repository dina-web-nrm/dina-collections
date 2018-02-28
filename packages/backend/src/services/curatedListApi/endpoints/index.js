const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createFeatureObservationTypeRequestSuccess = require('./featureObservationType/examples/requestSuccess.json')
const createDistinguishedUnitObservationTypeRequestSuccess = require('./distinguishedUnitObservationType/examples/requestSuccess.json')

const featureObservationType = createResource({
  basePath: '/api/curatedList/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createFeatureObservationTypeRequestSuccess },
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: getMany,
    },
  ],
  resource: 'featureObservationType',
})

const distinguishedUnitObservationType = createResource({
  basePath: '/curatedListApi/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: {
        primary: createDistinguishedUnitObservationTypeRequestSuccess,
      },
      operation: create,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: getMany,
    },
  ],

  resource: 'distinguishedUnitObservationType',
})

module.exports = {
  ...featureObservationType,
  ...distinguishedUnitObservationType,
}
