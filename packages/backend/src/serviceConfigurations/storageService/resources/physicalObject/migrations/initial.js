const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('physicalObjects')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('physicalObjects', {
      ...baseTableConfiguration,
      storageLocationId: {
        references: { key: 'id', model: 'storageLocations' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
