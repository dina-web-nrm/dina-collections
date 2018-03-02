const attachMethods = require('./attachMethods')
const Sequelize = require('sequelize')

module.exports = function createModel({
  customMethodFactories,
  name,
  schemaModelName,
  schemaVersion,
  sequelize,
}) {
  const Model = sequelize.define(name, {
    diff: {
      type: Sequelize.JSONB,
    },
    document: {
      type: Sequelize.JSONB,
    },
    id: {
      type: Sequelize.INTEGER,
    },
    isCurrentVersion: {
      type: Sequelize.BOOLEAN,
    },
    schemaCompliant: {
      type: Sequelize.BOOLEAN,
    },
    schemaVersion: {
      type: Sequelize.STRING,
    },
    version: { allowNull: true, type: Sequelize.INTEGER },
    versionId: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
  })

  return attachMethods({
    customMethodFactories,
    Model,
    schemaModelName,
    schemaVersion,
    sequelize,
  })
}
