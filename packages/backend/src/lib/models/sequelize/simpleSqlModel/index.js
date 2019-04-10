const setupMethods = require('./setupMethods')
const Sequelize = require('sequelize')
const createGetters = require('./utilities/createGetters')

module.exports = function createModel({
  config,
  columns,
  indexes = [],
  name,
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
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    sequelize,
    validate,
  })

  return {
    modelType: 'sequelizeSimpleSqlModel',
    name,
    ...methods,
  }
}
