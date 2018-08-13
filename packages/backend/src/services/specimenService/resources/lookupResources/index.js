const specification = require('./specification')

module.exports = specification.reduce(
  (obj, { getManyFilters, name, transformationSpecification }) => {
    const spec = {
      basePath: '/api/specimen/v01',
      model: {
        modelFactory: 'inMemoryViewDocumentModel',
        name,
        validate: false,
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
          type: 'getOne',
        },
        {
          filterSpecification: getManyFilters,
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
          transformationSpecification,
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
