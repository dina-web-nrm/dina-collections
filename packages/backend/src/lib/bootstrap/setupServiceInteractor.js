const initializeStatistics = require('../statistics')

const {
  getResourceRelationshipParamsMap,
} = require('common/src/schemaInterface')

const loadVersionSet = require('common/src/schemaInterface/loadVersionSet')
const singletons = require('common/src/schemaInterface/singletons')

const createBaseConfig = require('../config/createBaseConfig')
const createServiceInteractor = require('../serviceInteractor')
const createFileInteractor = require('../fileInteractor')
const createServices = require('../services')
const setupControllers = require('./setupControllers')

module.exports = function setupServiceInteractor({
  apiVersion,
  dataModelVersion,
  env,
  serviceDefinitions,
  serviceOrder,
}) {
  if (apiVersion && dataModelVersion) {
    singletons.set(
      loadVersionSet({
        apiVersion,
        dataModelVersion,
      })
    )
  }

  const resourceRelationshipParamsMap = getResourceRelationshipParamsMap()
  const config = createBaseConfig({ env })

  initializeStatistics({ config })
  const services = createServices({
    config,
    resourceRelationshipParamsMap,
    serviceDefinitions,
  })
  const serviceInteractor = createServiceInteractor({ config })
  const fileInteractor = createFileInteractor({ config })

  return setupControllers({
    config,
    fileInteractor,
    serviceInteractor,
    serviceOrder,
    services,
  }).then(() => {
    return serviceInteractor
  })
}
