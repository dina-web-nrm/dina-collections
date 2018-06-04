const bulkCreate = require('./bulkCreate')
const createLog = require('../../../../utilities/log')
const getCount = require('./getCount')
const getItemByTypeId = require('./getItemByTypeId')
const getItems = require('./getItems')
const migrateData = require('./migrateData')
const truncate = require('./truncate')
const createCache = require('./cache')

const defaultLog = createLog('lib/searchEngine/indexBuilder/dataInterface')

module.exports = function createDataInterface({
  connectors,
  log = defaultLog,
  models,
}) {
  log.info('Create createDataInterface')
  const dataInterface = {
    bulkCreate: ({ ...args }) => {
      return bulkCreate({
        models,
        ...args,
      })
    },
    getCount: ({ ...args }) => {
      return getCount({
        models,
        ...args,
      })
    },
    getItemByTypeId: (type, id) => {
      return getItemByTypeId({
        connectors,
        id,
        type,
      })
    },

    getItems: ({ ...args }) => {
      return getItems({
        connectors,
        ...args,
      })
    },
    migrateData: ({ ...args }) => {
      return migrateData({
        connectors,
        models,
        ...args,
      })
    },
    truncate: ({ ...args }) => {
      return truncate({
        models,
        ...args,
      })
    },
  }

  const cacheInterface = createCache({
    dataInterface,
  })

  return {
    ...cacheInterface,
    ...dataInterface,
  }
}
