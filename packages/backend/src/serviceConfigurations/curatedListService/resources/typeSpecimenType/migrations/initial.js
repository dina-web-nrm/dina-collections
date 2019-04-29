const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('typeSpecimenTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable(
      'typeSpecimenTypes',
      baseTableConfiguration
    )
  },
}
