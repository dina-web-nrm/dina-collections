/* eslint-disable sort-keys */
module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('exportJobs')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('exportJobs', {
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
      error: { type: Sequelize.TEXT },
      exportFields: { type: Sequelize.JSONB },
      exportIds: { type: Sequelize.JSONB },
      failedAt: { type: Sequelize.DATE },
      filePath: { type: Sequelize.STRING },
      requestId: { type: Sequelize.STRING },
      resource: { type: Sequelize.STRING },
      startedAt: { type: Sequelize.DATE },
      succeededAt: { type: Sequelize.DATE },
      userId: { type: Sequelize.STRING },
    })
  },
}
