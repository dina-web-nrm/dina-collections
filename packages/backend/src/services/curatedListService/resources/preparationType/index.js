const allFromObjectWithComputedId = require('../../../../lib/data/transformations/sharedTransformations/allFromObjectWithComputedId')
const createPreparationTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
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

  resource: 'preparationType',
}
