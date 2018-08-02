const createFactory = require('./methods/createFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const emptyFactory = require('./methods/emptyFactory')

module.exports = function setupMethods({ StageModel, ViewModel }) {
  const {
    buildWhereFilter,
    getById,
    getCount,
    getOneWhere,
    getWhere,
    deactivate,
    update,
    bulkCreate,
  } = ViewModel

  const synchronize = synchronizeFactory({ StageModel, ViewModel })
  const empty = emptyFactory({ synchronize })
  const create = createFactory({
    ViewModel,
  })

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
