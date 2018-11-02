const initializeStatistics = require('../statistics')

const {
  getResourceRelationshipParamsMap,
} = require('common/src/schemaInterface')

const createBaseConfig = require('../config/createBaseConfig')
const createServiceInteractor = require('../serviceInteractor')
const createFileInteractor = require('../fileInteractor')
const createServices = require('../services')
const setupConnectors = require('./setupConnectors')

const resourceRelationshipParamsMap = getResourceRelationshipParamsMap()

module.exports = function setupServiceInteractor({
  env,
  serviceDefinitions,
  serviceOrder,
}) {
  const config = createBaseConfig({ env })

  initializeStatistics({ config })
  const services = createServices({
    config,
    resourceRelationshipParamsMap,
    serviceDefinitions,
  })
  const serviceInteractor = createServiceInteractor({ config })
  const fileInteractor = createFileInteractor({ config })

  return setupConnectors({
    config,
    fileInteractor,
    serviceInteractor,
    serviceOrder,
    services,
  }).then(() => {
    return serviceInteractor
  })
}
