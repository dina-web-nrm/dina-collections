const allFromSrcWithIndexId = require('../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')
const createFeatureTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'featureType',
  },
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
        transformationFunctions: [allFromSrcWithIndexId],
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
