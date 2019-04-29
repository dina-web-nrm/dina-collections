/* eslint-disable sort-keys */
const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('normalizedAgents')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'normalizedAgents',
      baseTableConfiguration
    )
  },
}
