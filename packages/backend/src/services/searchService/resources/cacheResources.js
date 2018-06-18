const createGetManyFilterSpecifications = require('../../../lib/data/filters/utilities/createGetManyFilterSpecifications')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

const filterSpecificationMap = createGetManyFilterSpecifications({
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
                  id: '123',
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
          type: 'getOneSync',
        },
        {
          filterSpecificationMap,
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
          srcResource,
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
