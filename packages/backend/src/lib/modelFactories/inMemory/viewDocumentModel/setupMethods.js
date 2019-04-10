const synchronizeFactory = require('./methods/synchronizeFactory')

module.exports = function setupMethods({ StageModel, ViewModel }) {
  const {
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
