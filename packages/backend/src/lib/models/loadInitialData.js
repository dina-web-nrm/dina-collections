const createLog = require('../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/models', 1)

module.exports = function loadInitialData({ config, models, modelArray }) {
  if (!config.db.loadInitialData) {
    log.debug(
      `Not loading initial data: loadInitialData = ${config.db.loadInitialData}`
    )
    return Promise.resolve(null)
  }
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.debug(`${name}`)
        if (model.loadInitialData) {
          return model.loadInitialData({ config, models })
        }
        return true
      }
    })
  )
}
