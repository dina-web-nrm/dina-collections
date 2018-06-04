const attachMethods = require('./attachMethods')
const Sequelize = require('sequelize')
const createGetters = require('./utilities/createGetters')
const createSetters = require('./utilities/createSetters')

module.exports = function createModel({
  customMethodFactories,
  name,
  schemaModelName,
  schemaVersion,
  sequelize,
  normalizedColumnNames = [],
}) {
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
      schemaCompliant: {
        type: Sequelize.BOOLEAN,
      },
      schemaVersion: {
        type: Sequelize.STRING,
      },
      ...dataColumns,
    },
    {
      getterMethods: getters,
      setterMethods: setters,
    }
  )

  return attachMethods({
    customMethodFactories,
    Model,
    schemaModelName,
    schemaVersion,
    sequelize,
  })
}
