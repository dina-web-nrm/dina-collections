const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const getWhereFactory = require('./methods/getWhereFactory')
const syncFactory = require('./methods/syncFactory')
const updateFactory = require('./methods/updateFactory')

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

  const bulkCreate = bulkCreateFactory({
    elasticsearch,
    Model,
  })

  const coreMethods = {
    bulkCreate,
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
