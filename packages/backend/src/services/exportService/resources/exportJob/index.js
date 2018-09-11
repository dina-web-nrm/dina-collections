const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./data/filterSpecifications')

const {
  downloadExport: downloadExportOperationfactory,
} = require('./data/operationFactories')

const {
  create: createPostHooks,
  startJob: startJobPostHooks,
} = require('./data/postHooks')

const { create: createPreHooks } = require('./data/preHooks')

module.exports = {
  basePath: '/api/export/v01',
  model: {
    columns: {
      error: { type: Sequelize.TEXT },
      exportFields: { type: Sequelize.JSONB },
      exportIds: { type: Sequelize.JSONB },
      failedAt: { type: Sequelize.DATE },
      filePath: { type: Sequelize.STRING },
      requestId: { type: Sequelize.STRING },
      resource: { type: Sequelize.STRING },
      startedAt: { type: Sequelize.DATE },
      succeededAt: { type: Sequelize.DATE },
      userId: { type: Sequelize.STRING },
    },
    indexes: [
      {
        fields: ['userId', 'succeededAt'],
      },
    ],
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'exportJob',
  },
  operations: [
    {
      selectableFields: [
        'attributes.failedAt',
        'attributes.filePath',
        'attributes.succeededAt',
        'id',
      ],
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      selectableFields: ['id', 'attributes.filePath'],
      type: 'getMany',
    },
    {
      type: 'del',
    },
    {
      postHooks: createPostHooks,
      preHooks: createPreHooks,
      type: 'create',
    },
    {
      postHooks: startJobPostHooks,
      type: 'startJob',
    },
    {
      type: 'setJobFailed',
    },
    {
      type: 'setJobSuccess',
    },
    {
      factory: downloadExportOperationfactory,
    },
  ],
  resource: 'exportJob',
}
