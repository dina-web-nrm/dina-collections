const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

module.exports = {
  basePath: '/api/curatedList/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'featureType',
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      type: 'getMany',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
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
