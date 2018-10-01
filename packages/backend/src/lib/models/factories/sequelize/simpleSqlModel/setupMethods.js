const buildWhereFilterFactory = require('../sharedMethods/buildWhereFilterFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const delFactory = require('./methods/delFactory')
const getByIdFactory = require('../sharedMethods/getByIdFactory')
const getCountFactory = require('../sharedMethods/getCountFactory')
const getOneWhereFactory = require('../sharedMethods/getOneWhereFactory')
const getWhereFactory = require('../sharedMethods/getWhereFactory')
const synchronizeFactory = require('../sharedMethods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')
const updatePrimaryKeyFactory = require('../sharedMethods/updatePrimaryKeyFactory')

module.exports = function setupMethods({
  Model,
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

  const buildWhereFilter = buildWhereFilterFactory({ sequelize })
  const getById = getByIdFactory({
    Model,
  })

  const synchronize = synchronizeFactory({ Model })

  const getCount = getCountFactory({ Model })
  const getOneWhere = getOneWhereFactory({ buildWhereFilter, Model })
  const getWhere = getWhereFactory({ buildWhereFilter, Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const del = delFactory({
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

  const coreMethods = {
    buildWhereFilter,
    bulkCreate,
    create,
    del,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
    synchronize,
    update,
  }

  const availableMethods = Object.keys(coreMethods)

  return {
    ...coreMethods,
    availableMethods,
    Model,
  }
}
