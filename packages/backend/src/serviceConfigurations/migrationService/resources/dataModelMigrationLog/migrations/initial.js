/* eslint-disable sort-keys */

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('dataModelMigrationLogs')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('dataModelMigrationLogs', {
      createdAt: {
        type: Sequelize.DATE,
      },
      deactivatedAt: {
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: { type: Sequelize.STRING },
      dataModelVersion: { type: Sequelize.STRING },
    })
  },
}
