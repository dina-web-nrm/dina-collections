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

const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')

module.exports = {
  basePath: '/api/curatedList/v01',
  migrations,
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'identifierType',
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
      filterSpecification: getManyFilterSpecification,
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

  resource: 'identifierType',
}
