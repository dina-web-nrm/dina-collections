const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('places')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('places', {
      ...baseTableConfiguration,
      parentId: {
        references: { key: 'id', model: 'places' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
