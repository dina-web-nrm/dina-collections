const migrations = require('./migrations')
const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')

module.exports = {
  basePath: '/api/jobs/v01',
  migrations,
  model: {
    columns: {
      error: { type: Sequelize.TEXT },
      failedAt: { type: Sequelize.DATE },
      group: { type: Sequelize.STRING },
      operationId: { type: Sequelize.STRING },
      operationRequest: { type: Sequelize.JSONB },
      priority: { type: Sequelize.INTEGER },
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
      disableWrapperLog: true,
      filterSpecification: getManyFilterSpecification,
      sortableFields: ['id', 'priority'],
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
