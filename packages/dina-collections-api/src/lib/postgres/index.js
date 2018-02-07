const chainPromises = require('dina-shared/src/utilities/chainPromises')
const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

const syncModels = ({ config, models }) => {
  return chainPromises(
    Object.keys(models).map(modelName => {
      const model = models[modelName]
      return () => {
        return model.Model.sync({ force: config.db.flushOnRestart })
      }
    })
  )
}

module.exports = function bootstrapDatalayer({ apis, config }) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ apis, config, sequelize }).then(models => {
        return syncModels({ config, models }).then(() => {
          return createControllers({
            apis,
            config,
            models,
            sequelize,
          }).then(controllers => {
            return {
              controllers,
              models,
            }
          })
        })
      })
    })
  })
}
