const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('preparationTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'preparationTypes',
      baseTableConfiguration
    )
  },
}
