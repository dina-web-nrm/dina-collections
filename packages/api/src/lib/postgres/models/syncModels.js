const chainPromises = require('common/src/chainPromises')

module.exports = function syncModels({ config, models }) {
  return chainPromises(
    Object.keys(models).map(modelName => {
      const model = models[modelName]
      return () => {
        return model.Model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}
