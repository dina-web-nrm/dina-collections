const migrations = require('./migrations')
const Sequelize = require('sequelize')

module.exports = {
  basePath: '/api/migrationService/v01',
  migrations,
  model: {
    columns: {
      dataModelVersion: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING },
    },
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'dataModelMigrationLog',
  },
  operations: [
    {
      exampleRequests: {
        primary: {
          data: {
            attributes: {},
            type: 'dataModelMigrationLog',
          },
        },
      },
      type: 'create',
    },
    {
      type: 'getOne',
    },
    {
      sortableFields: ['id'],
      type: 'getMany',
    },
    {
      type: 'update',
    },
  ],
  resource: 'dataModelMigrationLog',
}
