const getManyfilterSpecification = require('./operations/getMany/filters')

exports.job = {
  basePath: '/api/jobs/v01',
  operations: [
    {
      exampleRequests: {
        primary: {
          data: {
            attributes: {},
            type: 'job',
          },
        },
      },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      filterSpecification: getManyfilterSpecification,
      type: 'getMany',
    },
    {
      type: 'update',
    },
    {
      type: 'del',
    },
    {
      type: 'startJob',
    },
    {
      type: 'setJobFailed',
    },
    {
      type: 'setJobSuccess',
    },
  ],
  resource: 'job',
}
