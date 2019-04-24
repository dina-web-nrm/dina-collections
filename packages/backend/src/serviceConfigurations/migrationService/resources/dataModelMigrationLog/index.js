const migrations = require('./migrations')
const Sequelize = require('sequelize')

module.exports = {
  migrations,
  model: {
    columns: {
      dataModelVersion: { type: Sequelize.STRING },
      status: { type: Sequelize.STRING },
    },
    name: 'dataModelMigrationLog',
    type: 'sequelizeSimpleSqlModel',
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
