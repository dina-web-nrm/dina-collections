/* eslint-disable sort-keys */
module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('transactions')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('transactions', {
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
      loanId: {
        references: { key: 'id', model: 'loans' },
        type: Sequelize.INTEGER,
      },
    })
  },
}
