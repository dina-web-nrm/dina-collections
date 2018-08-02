const setupMethods = require('./setupMethods')
const Sequelize = require('sequelize')

module.exports = function createModel({
  customMethodFactories,
  loadInitialData,
  name,
  relations,
  schemaModelName: schemaModelNameInput,
  schemaVersion = '1.0.1',
  sequelize,
  validate = true,
}) {
  const schemaModelName = schemaModelNameInput || name

  const Model = sequelize.define(name, {
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
  })
  const methods = setupMethods({
    customMethodFactories,
    loadInitialData,
    Model,
    relations,
    schemaModelName,
    schemaVersion,
    sequelize,
    validate,
  })

  return {
    modelType: 'sequelizeDocumentModel',
    name,
    ...methods,
  }
}
