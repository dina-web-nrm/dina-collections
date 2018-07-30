const createGetManyFilterSpecifications = require('../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

const filterSpecification = createGetManyFilterSpecifications({
  include: ['group'],
})

module.exports = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    const spec = {
      basePath: '/api/search/v01',
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
          type: 'getOne',
        },
        {
          filterSpecification,
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
