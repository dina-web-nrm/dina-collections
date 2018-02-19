const chainPromises = require('common/src/chainPromises')

module.exports = function syncModels({ config, modelArray }) {
  return chainPromises(
    modelArray.map(({ model }) => {
      return () => {
        return model.Model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}
