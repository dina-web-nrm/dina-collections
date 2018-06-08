const synchronizeFactory = require('./methods/synchronizeFactory')
const emptyFactory = require('./methods/emptyFactory')

module.exports = function attachMethods({ StageModel, ViewModel }) {
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
  const empty = emptyFactory({ synchronize })

  const coreMethods = {
    buildWhereFilter,
    bulkCreate,
    create,
    deactivate,
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
