const buildWhereFilterFactory = require('./methods/buildWhereFilterFactory')
const buildWhereQueryFactory = require('./methods/buildWhereQueryFactory')
const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const delFactory = require('./methods/delFactory')
const emptyFactory = require('./methods/emptyFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function attachMethods({ elasticsearch, Model }) {
  const getWhere = getWhereFactory({ elasticsearch, Model })
  const create = createFactory({
    elasticsearch,
    Model,
  })
  const buildWhereQuery = buildWhereQueryFactory({
    elasticsearch,
    Model,
  })

  const buildWhereFilter = buildWhereFilterFactory({
    elasticsearch,
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
    Model,
  })

  const update = updateFactory({
    elasticsearch,
    Model,
  })

  const bulkCreate = bulkCreateFactory({
    elasticsearch,
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
