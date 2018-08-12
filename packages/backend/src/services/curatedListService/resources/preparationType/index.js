const allFromSrcWithIndexId = require('../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')
const createPreparationTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'preparationType',
  },
  operations: [
    {
      exampleRequests: {
        primary: createPreparationTypeRequestSuccess,
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
      transformationSpecification: {
        description: 'Importing preparationTypes from file',
        srcFileName: 'preparationTypes',
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

  resource: 'preparationType',
}
