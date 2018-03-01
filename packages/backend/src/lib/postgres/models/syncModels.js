const chainPromises = require('common/src/chainPromises')

module.exports = function syncModels({ config, log, modelArray }) {
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
