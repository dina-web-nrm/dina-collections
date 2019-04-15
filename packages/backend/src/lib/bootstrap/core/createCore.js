const schemaInterface = require('common/src/schemaInterface')
const createLog = require('../../../utilities/log')
const { createConfig } = require('../../config')
const { createServiceInteractor } = require('../../serviceInteractor')
const { createFileInteractor } = require('../../fileInteractor')
const { createIntegrations } = require('../../integrations')
const {
  createServiceSpecifications,
  getModelSpecifications,
  getCustomControllerFactories,
  getOperationSpecifications,
} = require('../../serviceConfigurationManager')
const { createModels } = require('../../models')
const { createOperations } = require('../../operations')
const { createDataStores } = require('../../dataStores')

const resourceRelationshipParamsMap = schemaInterface.getResourceRelationshipParamsMap()

const log = createLog('bootstrap/core')

module.exports = function createCore({ serviceConfigurations }) {
  log.info('bootstrap core')
  const createCoreLog = log.scope()

  const config = createConfig()
  createCoreLog.info(`created config for env: ${config.env.env}`)

  const serviceSpecifications = createServiceSpecifications({
    config,
    log: createCoreLog,
    resourceRelationshipParamsMap,
    serviceConfigurations,
  })

  createCoreLog.info('creating service interactor')
  const serviceInteractor = createServiceInteractor({ config })
  createCoreLog.info('creating file interactor')
  const fileInteractor = createFileInteractor({ config })

  return createDataStores({
    config,
    log: createCoreLog,
  }).then(datastores => {
    return createModels({
      ...datastores,
      config,
      log: createCoreLog,
      modelSpecifications: getModelSpecifications({
        serviceSpecifications,
      }),
    }).then(models => {
      createCoreLog.info('creating integrations')
      return createIntegrations({ config, log: createCoreLog.scope() }).then(
        integrations => {
          return createOperations({
            config,
            customControllerFactories: getCustomControllerFactories({
              serviceSpecifications,
            }),
            fileInteractor,
            integrations,
            log: createCoreLog,
            models,
            operationSpecifications: getOperationSpecifications({
              serviceSpecifications,
            }),
            serviceInteractor,
          }).then(operations => {
            serviceInteractor.addOperations(operations)
            createCoreLog.info('operations added to serviceInteractor')
            return {
              config,
              fileInteractor,
              openApiSpec: schemaInterface.getOpenApiSpec(),
              operations,
              schemaInterface,
              serviceInteractor,
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
