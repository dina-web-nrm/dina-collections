const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./data/transformationSpecifications')

const createRequestSuccess = require('./data/exampleRequests/createSuccess.json')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./data/filterSpecifications')

module.exports = {
  basePath: '/api/agent/v01',
  model: {
    modelFactory: 'sequelizeDocumentModel',
    name: 'agent',
    relations: ['agent'],
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      type: 'getMany',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id', 'attributes.agentType', 'attributes.fullName'],
      type: 'query',
    },
    {
      type: 'update',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },

    {
      type: 'del',
    },
    {
      relationKey: 'user',
      type: 'getRelationship',
    },
    {
      relationKey: 'user',
      type: 'updateRelationship',
    },
  ],
  resource: 'agent',
}
