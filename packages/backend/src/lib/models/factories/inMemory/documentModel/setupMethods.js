const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const buildWhereQueryFactory = require('./methods/buildWhereQueryFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const deleteFactory = require('./methods/deleteFactory')
const emptyFactory = require('./methods/emptyFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getCountFactory = require('./methods/getCountFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const getOneWhereFactory = require('./methods/getOneWhereFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function setupMethods({
  loadInitialData,
  Model,
  schemaModelName,
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
  const buildWhereQuery = buildWhereQueryFactory()

  const synchronize = synchronizeFactory({ Model })
  const getById = getByIdFactory({
    Model,
  })
  const empty = emptyFactory({
    Model,
  })

  const getCount = getCountFactory({ Model })
  const create = createFactory({
    Model,
    validate,
  })

  const getWhere = getWhereFactory({
    buildWhereFilter,
    buildWhereQuery,
    Model,
  })
  const getOneWhere = getOneWhereFactory({
    getWhere,
    Model,
  })

  const del = deleteFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    validate,
  })

  const coreMethods = {
    buildWhereFilter,
    buildWhereQuery,
    bulkCreate,
    create,
    del,
    empty,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    Model,
    synchronize,
    update,
  }

  const availableMethods = [...Object.keys(coreMethods)]

  return {
    ...coreMethods,
    availableMethods,
    loadInitialData,
    Model,
  }
}
