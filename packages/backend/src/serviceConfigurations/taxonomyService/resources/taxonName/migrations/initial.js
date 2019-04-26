const baseTableConfiguration = require('../../../../../lib/models/sequelize/documentModel/baseTableConfiguration')

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('taxonNames')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('taxonNames', {
      ...baseTableConfiguration,
      acceptedToTaxonId: {
        references: { key: 'id', model: 'taxons' },
        type: Sequelize.INTEGER,
      },
      synonymToTaxonId: {
        references: { key: 'id', model: 'taxons' },
        type: Sequelize.INTEGER,
      },
      vernacularToTaxonId: {
        references: { key: 'id', model: 'taxons' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
