const migrations = require('./migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const createRequestSuccess = require('./exampleRequests/createSuccess.json')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
} = require('./postHooks')

module.exports = {
  migrations,
  model: {
    name: 'featureType',
    type: 'sequelizeDocumentModel',
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
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
  resource: 'featureType',
}
