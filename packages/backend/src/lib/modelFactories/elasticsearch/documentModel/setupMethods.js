const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const buildWhereQueryFactory = require('./methods/buildWhereQueryFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const delFactory = require('./methods/delFactory')
const emptyFactory = require('./methods/emptyFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getOneWhereFactory = require('./methods/getOneWhereFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const indexVersionManagerFactory = require('./methods/indexVersionManagerFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function setupMethods({
  elasticsearch,
  forceRefresh,
  Model,
  rebuildStrategy,
}) {
  const indexVersionManager = indexVersionManagerFactory({
    elasticsearch,
    Model,
    rebuildStrategy,
  })
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
    forceRefresh: true,
    Model,
  })

  const synchronize = synchronizeFactory({
    elasticsearch,
    indexVersionManager,
    Model,
    rebuildStrategy,
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
    forceRefresh: true,
    getById,
    Model,
  })

  const update = updateFactory({
    elasticsearch,
    forceRefresh: true,
    Model,
  })

  const bulkCreate = bulkCreateFactory({
    elasticsearch,
    forceRefresh,
    indexVersionManager,
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
    getViewMeta: indexVersionManager.getViewMeta,
    getWhere,
    swap: indexVersionManager.swap,
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
