const createLog = require('../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/models', 0)

module.exports = function syncModels({ config, modelArray }) {
  if (!config.db.flushOnRestart) {
    log.debug(
      `Dont syncing models: flushOnRestart = ${config.db.flushOnRestart}`
    )
    return Promise.resolve(null)
  }
  log.debug(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.scope().debug(`${name}`)
        return model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}
