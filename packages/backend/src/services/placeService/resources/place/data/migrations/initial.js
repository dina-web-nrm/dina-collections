/* eslint-disable sort-keys */
module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('places')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('places', {
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
      schemaVersion: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      parentId: {
        references: { key: 'id', model: 'places' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
