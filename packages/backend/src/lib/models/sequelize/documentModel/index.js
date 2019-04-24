const setupMethods = require('./setupMethods')
const Sequelize = require('sequelize')

module.exports = function createModel({
  config,
  customMethodFactories,
  loadInitialData,
  name,
  relations,
  schemaModelName: schemaModelNameInput,
  sequelize,
  validate = true,
}) {
  const schemaModelName = schemaModelNameInput || name

  const Model = sequelize.define(
    name,
    {
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
    },
    {
      deletedAt: 'deactivatedAt',
      paranoid: true,
    }
  )
  const methods = setupMethods({
    config,
    customMethodFactories,
    loadInitialData,
    Model,
    relations,
    schemaModelName,
    sequelize,
    validate,
  })

  return {
    modelType: 'sequelizeDocumentModel',
    name,
    ...methods,
  }
}
