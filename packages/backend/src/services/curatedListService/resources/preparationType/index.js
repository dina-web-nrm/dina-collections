const migrations = require('./data/migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')
const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./data/postHooks')

module.exports = {
  basePath: '/api/curatedList/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'preparationType',
  },
  operations: [
    {
      exampleRequests: {
        primary: createRequestSuccess,
      },
      postHooks: createPostHooks,
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
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
  ],

  resource: 'preparationType',
}
