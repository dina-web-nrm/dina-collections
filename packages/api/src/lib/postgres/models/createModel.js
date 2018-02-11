const Sequelize = require('sequelize')
const createFactory = require('./modelMethods/createFactory')
const getByIdFactory = require('./modelMethods/getByIdFactory')
const getOneWhereFactory = require('./modelMethods/getOneWhereFactory')
const updateFactory = require('./modelMethods/updateFactory')

const { createSystemModelSchemaValidator } = require('common/src/error')

// make model-factory more advanced
// * add where search to get single revision

module.exports = function createModel({
  name,
  sequelize,
  schemaModelName,
  schemaVersion,
  customMethodFactories,
}) {
  let validate = () => {
    return null
  }
  // TODO - test schema-validations
  // inject schema
  if (schemaModelName) {
    validate = createSystemModelSchemaValidator({
      model: schemaModelName,
      throwOnError: false,
    })
  }

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

  const getById = getByIdFactory({
    Model,
  })

  const getOneWhere = getOneWhereFactory({ Model })

  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const coreMethods = {
    create,
    getById,
    getOneWhere,
    Model,
    update,
  }

  const customMethods = !customMethodFactories
    ? {}
    : Object.keys(customMethodFactories).reduce((methods, key) => {
        return {
          ...methods,
          [key]: customMethodFactories[key]({
            coreMethods,
            Model,
            schemaVersion,
            sequelize,
            validate,
          }),
        }
      }, {})

  return {
    ...coreMethods,
    ...customMethods,
  }
}
