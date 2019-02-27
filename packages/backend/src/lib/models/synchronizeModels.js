const createLog = require('../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/models', 0)

module.exports = function synchronizeModels({ config, modelArray }) {
  log.info(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.scope().info(`${name}`)
        return model.synchronize({ force: config.db.flushOnRestart })
      }
    })
  )
}
