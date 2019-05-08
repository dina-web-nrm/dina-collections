const Sequelize = require('sequelize')
/* eslint-disable sort-keys */

module.exports = {
  createdAt: {
    type: Sequelize.DATE,
  },
  deactivatedAt: {
    type: Sequelize.DATE,
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
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
}
