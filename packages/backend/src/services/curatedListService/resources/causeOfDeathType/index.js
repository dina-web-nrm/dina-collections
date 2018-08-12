const allFromSrcWithIndexId = require('../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')
const requestSuccess = require('./operations/create/examples/requestSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'causeOfDeathType',
  },
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
        description: 'Importing causeOfDeathTypes from file',
        srcFileName: 'causeOfDeathTypes',
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
  resource: 'causeOfDeathType',
}
