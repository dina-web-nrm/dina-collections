const now = require('performance-now')

const startTime = now()
const initializeStatistics = require('../statistics')
const {
  getResourceRelationshipParamsMap,
} = require('common/src/schemaInterface')
const createLog = require('../../utilities/log')

const createServiceInteractor = require('../serviceInteractor')
const createFileInteractor = require('../fileInteractor')
const createServices = require('../services')

const setupConnectors = require('./setupConnectors')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

const resourceRelationshipParamsMap = getResourceRelationshipParamsMap()

module.exports = function bootstrapServiceInteractor({
  config,
  serviceDefinitions,
  serviceOrder,
}) {
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
