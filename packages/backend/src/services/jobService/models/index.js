const Sequelize = require('sequelize')

module.exports = [
  {
    columns: {
      failedAt: { type: Sequelize.DATE },
      operationId: { type: Sequelize.STRING },
      operationRequest: { type: Sequelize.JSONB },
      startedAt: { type: Sequelize.DATE },
      succeededAt: { type: Sequelize.DATE },
    },
    modelFactory: 'sequelizeSimpleSqlModel',
    name: 'job',
  },
]
