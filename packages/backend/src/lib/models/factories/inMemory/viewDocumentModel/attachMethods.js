const synchronizeFactory = require('./methods/synchronizeFactory')

module.exports = function attachMethods({ StageModel, ViewModel }) {
  const {
    buildWhereFilter,
    buildWhereQuery,
    bulkCreate,
    create,
    del,
    empty,
    getById,
    getByIdSync,
    getCount,
    getOneWhere,
    getWhere,
    update,
  } = ViewModel

  const synchronize = synchronizeFactory({ StageModel, ViewModel })

  const coreMethods = {
    buildWhereFilter,
    buildWhereQuery,
    bulkCreate,
    create,
    del,
    empty,
    getById,
    getByIdSync,
    getCount,
    getOneWhere,
    getWhere,
    synchronize,
    update,
  }

  const availableMethods = [...Object.keys(coreMethods)]

  return {
    ...coreMethods,
    availableMethods,
    StageModel,
    ViewModel,
  }
}
