const createFeatureTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: { primary: createFeatureTypeRequestSuccess },
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
  resource: 'featureType',
}
