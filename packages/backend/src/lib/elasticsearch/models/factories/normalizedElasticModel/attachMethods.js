const createFactory = require('./methods/createFactory')
const syncFactory = require('./methods/syncFactory')
const updateFactory = require('./methods/updateFactory')
const getWhereFactory = require('./methods/getWhereFactory')

module.exports = function attachMethods({ elasticsearch, Model }) {
  const getWhere = getWhereFactory({ elasticsearch, Model })
  const create = createFactory({
    elasticsearch,
    Model,
  })

  const sync = syncFactory({
    elasticsearch,
    Model,
  })

  const update = updateFactory({
    elasticsearch,
    Model,
  })

  const coreMethods = {
    create,
    getWhere,
    sync,
    update,
  }

  return {
    ...coreMethods,
    Model,
  }
}
