const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const deactivateFactory = require('./methods/deactivateFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getCountFactory = require('./methods/getCountFactory')
const getOneWhereFactory = require('./methods/getOneWhereFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const setupRelationsFactory = require('./methods/setupRelationsFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')
const updatePrimaryKeyFactory = require('./methods/updatePrimaryKeyFactory')

module.exports = function attachMethods({
  customMethodFactories,
  loadInitialData,
  Model,
  relations,
  schemaModelName,
  schemaVersion,
  sequelize,
  validate: performValidation,
}) {
  let validate = () => {
    return null
  }
  if (performValidation) {
    validate = dbValidator({
      model: schemaModelName,
      throwOnError: false,
    })
  }

  const buildWhereFilter = buildWhereFilterFactory()
  const getById = getByIdFactory({
    Model,
  })

  const synchronize = synchronizeFactory({ Model })

  const getCount = getCountFactory({ Model })
  const getOneWhere = getOneWhereFactory({ Model })
  const getWhere = getWhereFactory({ Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const deactivate = deactivateFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const updatePrimaryKey = updatePrimaryKeyFactory({
    Model,
    schemaVersion,
    sequelize,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    schemaVersion,
    updatePrimaryKey,
    validate,
  })

  const setupRelations = relations ? setupRelationsFactory({ relations }) : null

  const coreMethods = {
    buildWhereFilter,
    bulkCreate,
    create,
    deactivate,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
    setupRelations,
    synchronize,
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

  const availableMethods = [
    ...Object.keys(coreMethods),
    ...Object.keys(customMethods),
  ]

  return {
    ...coreMethods,
    ...customMethods,
    availableMethods,
    loadInitialData,
    Model,
  }
}
