const allFromObjectWithComputedId = require('../../../../lib/data/transformations/sharedTransformations/allFromObjectWithComputedId')
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
      transformationSpecification: {
        description: 'Importing featureTypes from file',
        srcFileName: 'featureTypes',
        transformationFunctions: {
          allFromObjectWithComputedId,
        },
      },
      type: 'importDataFromFile',
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
