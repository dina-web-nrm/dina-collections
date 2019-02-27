const migrations = require('./migrations')
const Sequelize = require('sequelize')
const {
  getMany: getManyFilterSpecification,
} = require('./filterSpecifications')

const {
  downloadExport: downloadExportOperationfactory,
} = require('./operationFactories')

const {
  create: createPostHooks,
  startJob: startJobPostHooks,
} = require('./postHooks')

const { create: createPreHooks } = require('./preHooks')

module.exports = {
  basePath: '/api/export/v01',
  migrations,
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
      exampleRequests: {
        primary: {
          data: {
            attributes: {
              exportFields: [{ fieldPath: 'id', label: 'id' }],
              exportIds: [1, 2, 3],
              resource: 'specimen',
            },
            type: 'exportJob',
          },
        },
      },
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
