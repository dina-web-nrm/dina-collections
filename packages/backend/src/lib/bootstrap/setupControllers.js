const initializeDataStores = require('../dataStores')
const setupModels = require('../models')
const initializeControllers = require('../controllers/initializeControllers')
const setupIntegrations = require('../integrations')

module.exports = function setupControllers({
  config,
  fileInteractor,
  serviceInteractor,
  serviceOrder,
  services,
}) {
  return initializeDataStores({
    config,
  }).then(({ elasticsearch, inMemoryDb, sequelize }) => {
    return setupModels({
      config,
      elasticsearch,
      inMemoryDb,
      sequelize,
      serviceOrder,
      services,
    }).then(({ models }) => {
      return setupIntegrations({ config }).then(integrations => {
        return initializeControllers({
          config,
          fileInteractor,
          integrations,
          models,
          serviceInteractor,
          services,
        }).then(controllers => {
          serviceInteractor.addControllers(controllers)
          return controllers
        })
      })
    })
  })
}
