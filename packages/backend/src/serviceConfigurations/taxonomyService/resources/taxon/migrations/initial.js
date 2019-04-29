const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('taxons')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('taxons', {
      ...baseTableConfiguration,
      parentId: {
        references: { key: 'id', model: 'taxons' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
