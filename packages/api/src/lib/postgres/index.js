const syncModels = require('./models/syncModels')
const bootstrapModels = require('./models/bootstrapModels')
const setupRelations = require('./models/setupRelations')
const createControllers = require('./controllers')
const createDb = require('./db')

module.exports = function bootstrapDatalayer({ apis, config }) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return bootstrapModels({ apis, config, sequelize }).then(
        ({ modelArray, modelObject: models }) => {
          return setupRelations({ apis, models }).then(() => {
            return syncModels({ config, models, modelArray }).then(() => {
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
        }
      )
    })
  })
}
