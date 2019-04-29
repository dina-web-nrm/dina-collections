const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('specimens')
  },
  up: ({ queryInterface }) => {
    return queryInterface.createTable('specimens', baseTableConfiguration)
  },
}
