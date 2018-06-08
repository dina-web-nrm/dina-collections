const createGetManyFilters = require('../../../lib/services/operationFactory/filters/createGetManyFilters')

const filters = createGetManyFilters({
  include: ['group'],
})

const cacheResources = require('../cacheResources')

exports.searchSpecimen = require('./searchSpecimen')

cacheResources.forEach(({ name, srcResource }) => {
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
        filters,
        type: 'getMany',
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

  exports[name] = spec
})
