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
      ? normalizedColumnNames.reduce((obj, columnName) => {
          return {
            ...obj,
            [columnName]: {
              type: Sequelize.JSONB,
            },
          }
        }, {})
      : {
          document: {
            type: Sequelize.JSONB,
          },
        }

  const Model = sequelize.define(
    name,
    {
      diff: {
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
      ...dataColumns,
    },
    {
      getterMethods: getters,
      indexes: [
        {
          fields: ['id'],
        },
        {
          fields: ['id', 'isCurrentVersion'],
        },
      ],
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
