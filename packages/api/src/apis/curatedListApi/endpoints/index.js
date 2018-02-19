const createResource = require('../../../lib/resourceFactory')

const featureObservationType = createResource({
  basePath: '/curatedListApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],
  resource: 'featureObservationType',
})

const identifiableUnitObservationType = createResource({
  basePath: '/curatedListApi/v01',
  operations: [
    {
      connect: true,
      operationType: 'create',
    },
    {
      connect: true,
      operationType: 'update',
    },
    {
      connect: true,
      operationType: 'getOne',
    },
    {
      connect: true,
      operationType: 'getMany',
    },
  ],

  resource: 'identifiableUnitObservationType',
})

module.exports = {
  ...featureObservationType,
  ...identifiableUnitObservationType,
}
