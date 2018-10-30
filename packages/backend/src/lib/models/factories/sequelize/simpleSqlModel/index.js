const setupMethods = require('./setupMethods')
const Sequelize = require('sequelize')
const createGetters = require('./utilities/createGetters')

module.exports = function createModel({
  config,
  columns,
  indexes = [],
  name,
  schemaModelName: schemaModelNameInput,
  schemaVersion = '1.0.1',
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
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      schemaCompliant: {
        type: Sequelize.BOOLEAN,
      },
      schemaVersion: {
        type: Sequelize.STRING,
      },
      ...columns,
    },
    {
      getterMethods: createGetters(),
      indexes,
    }
  )

  const methods = setupMethods({
    config,
    Model,
    schemaModelName,
    schemaVersion,
    sequelize,
    validate,
  })

  return {
    modelType: 'sequelizeSimpleSqlModel',
    name,
    ...methods,
  }
}
