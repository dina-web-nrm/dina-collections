const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('storageLocations')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('storageLocations', {
      ...baseTableConfiguration,
      parentId: {
        references: { key: 'id', model: 'storageLocations' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
