const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const buildWhereQueryFactory = require('./methods/buildWhereQueryFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const delFactory = require('./methods/delFactory')
const emptyFactory = require('./methods/emptyFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const getOneWhereFactory = require('./methods/getOneWhereFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function setupMethods({ elasticsearch, Model, forceRefresh }) {
  const buildWhereQuery = buildWhereQueryFactory({
    elasticsearch,
    Model,
  })

  const buildWhereFilter = buildWhereFilterFactory({
    elasticsearch,
    Model,
  })
  const getWhere = getWhereFactory({
    buildWhereFilter,
    buildWhereQuery,
    elasticsearch,
    Model,
  })
  const getOneWhere = getOneWhereFactory({
    elasticsearch,
    getWhere,
    Model,
  })
  const create = createFactory({
    elasticsearch,
    forceRefresh,
    Model,
  })

  const synchronize = synchronizeFactory({
    elasticsearch,
    Model,
  })

  const getById = getByIdFactory({
    elasticsearch,
    Model,
  })

  const empty = emptyFactory({
    synchronize,
  })

  const del = delFactory({
    elasticsearch,
    getById,
    Model,
  })

  const update = updateFactory({
    elasticsearch,
    forceRefresh,
    Model,
  })

  const bulkCreate = bulkCreateFactory({
    elasticsearch,
    forceRefresh,
    Model,
  })

  const coreMethods = {
    buildWhereFilter,
    buildWhereQuery,
    bulkCreate,
    create,
    del,
    empty,
    getById,
    getOneWhere,
    getWhere,
    synchronize,
    update,
  }

  const availableMethods = [...Object.keys(coreMethods)]
  return {
    ...coreMethods,
    availableMethods,
    Model,
  }
}
