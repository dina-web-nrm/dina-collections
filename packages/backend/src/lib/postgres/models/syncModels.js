const createLog = require('../../../utilities/log')

const log = createLog('lib/postgres', 1)

const chainPromises = require('common/src/chainPromises')

module.exports = function syncModels({ config, modelArray }) {
  log.debug(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.debug(`${name}`)
        return model.Model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}
