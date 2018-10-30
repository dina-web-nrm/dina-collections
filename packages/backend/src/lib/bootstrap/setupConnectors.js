const initializeDataStores = require('../dataStores')
const setupModels = require('../models')
const createConnectors = require('../connectors')

const setupIntegrations = require('../integrations')

module.exports = function setupConnectors({
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
      return setupIntegrations({ config })
        .then(integrations => {
          return createConnectors({
            config,
            fileInteractor,
            integrations,
            models,
            serviceInteractor,
            services,
          })
        })
        .then(({ connectors }) => {
          serviceInteractor.addConnectors(connectors)
          return { connectors }
        })
    })
  })
}
