// const now = require('performance-now')

// const startTime = now()

const schemaInterface = require('common/src/schemaInterface')
const createBaseConfig = require('../../config/createBaseConfig')
const createServiceInteractor = require('../../serviceInteractor')
const createFileInteractor = require('../../fileInteractor')
const createIntegrations = require('../../integrations')
const createDataStores = require('../../dataStoreFactories/create')
const createServiceInterface = require('../../serviceInterface')
const createLog = require('../../../utilities/log')

const resourceRelationshipParamsMap = schemaInterface.getResourceRelationshipParamsMap()

const log = createLog('bootstrap/core')

module.exports = function createCore({
  env,
  serviceConfigurations,
  serviceOrder,
  workerActive,
}) {
  log.info('bootstrap core')
  const createCoreLog = log.scope()

  const config = createBaseConfig({ env, workerActive })
  createCoreLog.info(`created config for env: ${config.env.env}`)
  // inject operation factories

  createCoreLog.info('creating service interface')
  const serviceInterface = createServiceInterface({
    config,
    log: createCoreLog.scope(),
    resourceRelationshipParamsMap,
    serviceConfigurations,
    serviceOrder,
  })
  createCoreLog.info('creating service interactor')
  const serviceInteractor = createServiceInteractor({ config })
  createCoreLog.info('creating file interactor')
  const fileInteractor = createFileInteractor({ config })

  createCoreLog.info('creating data stores')
  return createDataStores({
    config,
    log: createCoreLog.scope(),
  }).then(datastores => {
    createCoreLog.info('creating models')
    return serviceInterface.createModels(datastores).then(models => {
      createCoreLog.info('creating integrations')
      return createIntegrations({ config, log: createCoreLog.scope() }).then(
        integrations => {
          createCoreLog.info('creating operations')
          return serviceInterface
            .createOperations({
              fileInteractor,
              integrations,
              models,
              serviceInteractor,
            })
            .then(operations => {
              serviceInteractor.addOperations(operations)
              createCoreLog.info('operations added to serviceInteractor')
              return {
                config,
                fileInteractor,
                operations,
                schemaInterface,
                serviceInteractor,
                serviceInterface,
              }
            })
        }
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
