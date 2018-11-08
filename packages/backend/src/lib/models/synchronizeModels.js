const createLog = require('../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/models', 0)

module.exports = function synchronizeModels({ config, modelArray }) {
  log.debug(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.scope().debug(`${name}`)
        return model.synchronize({ force: config.db.flushOnRestart })
      }
    })
  )
}
