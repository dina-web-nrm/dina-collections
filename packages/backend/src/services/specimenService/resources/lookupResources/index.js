const specification = require('./specification')

module.exports = specification.reduce(
  (obj, { name, transformationSpecification }) => {
    const spec = {
      basePath: '/api/specimen/v01',
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
