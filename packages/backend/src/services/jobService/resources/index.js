const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

exports.job = {
  basePath: '/api/jobs/v01',
  model: {
    columns: {
      error: { type: Sequelize.TEXT },
      failedAt: { type: Sequelize.DATE },
      operationId: { type: Sequelize.STRING },
      operationRequest: { type: Sequelize.JSONB },
      startedAt: { type: Sequelize.DATE },
      succeededAt: { type: Sequelize.DATE },
    },
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'job',
  },
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
      filterSpecification: getManyFilterSpecification,
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
