const allFromObjectWithComputedId = require('../../../../lib/data/transformations/sharedTransformations/allFromObjectWithComputedId')
const requestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: { primary: requestSuccess },
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
        description: 'Importing establishmentMeansTypes from file',
        srcFileName: 'establishmentMeansTypes',
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
  resource: 'establishmentMeansType',
}
