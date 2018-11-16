const setupMethods = require('./setupMethods')
const Sequelize = require('sequelize')
const createGetters = require('../utilities/createGetters')
const createSetters = require('../utilities/createSetters')

module.exports = function createModel({
  config,
  customMethodFactories,
  loadInitialData,
  name,
  normalizedColumnNames = [],
  relations,
  schemaModelName: schemaModelNameInput,
  sequelize,
  validate = true,
}) {
  const schemaModelName = schemaModelNameInput || name
  const getters = createGetters(normalizedColumnNames)
  const setters = createSetters(normalizedColumnNames)

  const dataColumns =
    normalizedColumnNames && normalizedColumnNames.length
      ? normalizedColumnNames.reduce(
          (obj, columnName) => {
            return {
              ...obj,
              [columnName]: {
                type: Sequelize.JSONB,
              },
            }
          },
          {
            nonNormalized: {
              type: Sequelize.JSONB,
            },
          }
        )
      : {
          document: {
            type: Sequelize.JSONB,
          },
        }

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
      relationships: {
        type: Sequelize.JSONB,
      },
      schemaCompliant: {
        type: Sequelize.BOOLEAN,
      },
      ...dataColumns,
    },
    {
      deletedAt: 'deactivatedAt',
      getterMethods: getters,
      paranoid: true,
      setterMethods: setters,
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
    modelType: 'sequelizeNormalizedDocumentModel',
    name,
    ...methods,
  }
}
