const createGetManyFilterSpecifications = require('../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

const filterSpecification = createGetManyFilterSpecifications({
  include: ['group'],
})

module.exports = cacheResourcesSpecifications.reduce(
  (
    obj,
    { defaultLimit, name, srcResource, srcRelationships, modelRelationships }
  ) => {
    const spec = {
      basePath: '/api/search/v01',
      model: {
        name,
        relationships: modelRelationships,
        type: 'inMemoryViewDocumentModel',
      },
      operations: [
        {
          exampleRequests: {
            primary: {
              data: {
                attributes: {
                  info: '123',
                },
                type: name,
              },
            },
          },
          type: 'create',
        },
        {
          includeRelations: true,
          type: 'getOne',
        },
        {
          filterSpecification,
          includeRelations: true,
          type: 'getMany',
        },
        {
          type: 'emptyView',
        },
        {
          type: 'update',
        },
        {
          type: 'del',
        },
        {
          transformationSpecification: {
            defaultLimit,
            srcRelationships,
            srcResource,
          },
          type: 'rebuildView',
        },
      ],
      resource: name,
    }
    return {
      ...obj,
      [name]: spec,
    }
  },
  {}
)
