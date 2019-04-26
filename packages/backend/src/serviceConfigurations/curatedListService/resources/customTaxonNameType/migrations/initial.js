const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('customTaxonNameTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'customTaxonNameTypes',
      baseTableConfiguration
    )
  },
}
