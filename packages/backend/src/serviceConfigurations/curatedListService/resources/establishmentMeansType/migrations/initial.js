const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('establishmentMeansTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'establishmentMeansTypes',
      baseTableConfiguration
    )
  },
}
