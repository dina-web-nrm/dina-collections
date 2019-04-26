const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('featureTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable('featureTypes', baseTableConfiguration)
  },
}
