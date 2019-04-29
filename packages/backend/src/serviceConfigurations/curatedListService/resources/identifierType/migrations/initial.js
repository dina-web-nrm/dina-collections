const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('identifierTypes')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable('identifierTypes', baseTableConfiguration)
  },
}
