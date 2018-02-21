const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createFeatureObservationTypeRequestSuccess = require('./featureObservationType/examples/requestSuccess.json')
const createIdentifiableUnitObservationTypeRequestSuccess = require('./identifiableUnitObservationType/examples/requestSuccess.json')

const featureObservationType = createResource({
  basePath: '/curatedListApi/v01',
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

const identifiableUnitObservationType = createResource({
  basePath: '/curatedListApi/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: {
        primary: createIdentifiableUnitObservationTypeRequestSuccess,
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

  resource: 'identifiableUnitObservationType',
})

module.exports = {
  ...featureObservationType,
  ...identifiableUnitObservationType,
}
