const allFromSrcWithIndexId = require('../../../../lib/data/transformations/sharedTransformations/allFromSrcWithIndexId')

const createRequestSuccess = require('./operations/create/examples/requestSuccess.json')
const createGetManyFilterSpecifications = require('../../../../lib/data/filters/utilities/createGetManyFilterSpecifications')

const {
  createStringMatchFilter,
  createStringSearchFilter,
} = require('../../../../lib/data/filters/factories')

const getManyFilterSpecificationMap = createGetManyFilterSpecifications({
  custom: {
    fullNameSearch: createStringSearchFilter({
      fieldPath: 'fullName',
      key: 'fullNameSearch',
    }),
    matchAgentType: createStringMatchFilter({
      fieldPath: 'agentType',
      key: 'matchAgentType',
    }),
  },
  include: ['id', 'ids', 'updatedAfter', 'parentId', 'group', 'name'],
})

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
      filterSpecification: getManyFilterSpecificationMap,
      includeRelations: true,
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecificationMap,
      selectableFields: ['id', 'attributes.agentType', 'attributes.fullName'],
      type: 'query',
    },
    {
      type: 'update',
    },
    {
      transformationSpecification: {
        description: 'Importing agents from file',
        srcFileName: 'agents',
        transformationFunctions: [allFromSrcWithIndexId],
      },
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
