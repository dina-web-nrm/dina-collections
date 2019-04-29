const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('causeOfDeathTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'causeOfDeathTypes',
      baseTableConfiguration
    )
  },
}
