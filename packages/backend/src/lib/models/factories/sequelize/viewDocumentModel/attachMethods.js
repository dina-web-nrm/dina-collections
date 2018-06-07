const synchronizeFactory = require('./methods/synchronizeFactory')

module.exports = function attachMethods({
  loadInitialData,
  StageModel,
  ViewModel,
}) {
  const {
    buildWhereFilter,
    getById,
    getCount,
    getOneWhere,
    create,
    getWhere,
    deactivate,
    update,
    bulkCreate,
  } = ViewModel

  const synchronize = synchronizeFactory({ StageModel, ViewModel })

  const coreMethods = {
    buildWhereFilter,
    bulkCreate,
    create,
    deactivate,
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
    loadInitialData,
    StageModel,
    ViewModel,
  }
}
