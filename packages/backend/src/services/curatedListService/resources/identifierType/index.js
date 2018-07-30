const allFromSrcWithIndexId = require('../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')
const createSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  operations: [
    {
      exampleRequests: {
        primary: createSuccess,
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
        description: 'Importing identifierTypes from file',
        srcFileName: 'identifierTypes',
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

  resource: 'identifierType',
}
