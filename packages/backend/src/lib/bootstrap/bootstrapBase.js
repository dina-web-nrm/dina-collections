const now = require('performance-now')

const startTime = now()
const initializeStatistics = require('../statistics')

const {
  getResourceRelationshipParamsMap,
} = require('common/src/schemaInterface')
const createLog = require('../../utilities/log')

const createBaseConfig = require('../config/createBaseConfig')
const createServiceInteractor = require('../serviceInteractor')
const createFileInteractor = require('../fileInteractor')
const createServices = require('../services')
const setupConnectors = require('./setupConnectors')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

const resourceRelationshipParamsMap = getResourceRelationshipParamsMap()

module.exports = function bootstrapBase({
  env,
  main,
  serviceDefinitions,
  serviceOrder,
}) {
  const config = createBaseConfig({ env })

  const bootstrapStartTime = now()

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
  }).then(({ connectors }) => {
    return Promise.resolve()
      .then(() => {
        return main({
          config,
          connectors,
          log,
          serviceInteractor,
        })
      })
      .then(({ message }) => {
        log.info(
          '######################################################################################'
        )

        log.info(
          `Started after: ${now() -
            startTime} milliseconds. Bootstrap time: ${now() -
            bootstrapStartTime}`
        )
        if (message) {
          log.info(message)
        }

        log.info(
          '######################################################################################'
        )
      })
  })
}

process.on('uncaughtException', err => {
  log.crit('uncaughtException process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

process.on('unhandledRejection', err => {
  log.crit('unhandledRejection process exiting in 5000 ms')
  log.crit(err)
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})
