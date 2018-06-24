const allFromObjectWithComputedId = require('../../../../lib/data/transformations/sharedTransformations/allFromObjectWithComputedId')
const createTypeSpecimenTypeRequestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: {
        primary: createTypeSpecimenTypeRequestSuccess,
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
        description: 'Importing typeSpecimenTypes from file',
        srcFileName: 'typeSpecimenTypes',
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

  resource: 'typeSpecimenType',
}
