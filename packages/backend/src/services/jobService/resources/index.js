const getManyfilters = require('./operations/getMany/filters')

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
      filterSpecifications: getManyfilters,
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
