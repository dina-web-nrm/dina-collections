/* eslint-disable sort-keys */
module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('taxonNames')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('taxonNames', {
      createdAt: {
        type: Sequelize.DATE,
      },
      deactivatedAt: {
        type: Sequelize.DATE,
      },
      diff: {
        type: Sequelize.JSONB,
      },
      document: {
        type: Sequelize.JSONB,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      relationships: {
        type: Sequelize.JSONB,
      },
      schemaCompliant: {
        type: Sequelize.BOOLEAN,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
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
