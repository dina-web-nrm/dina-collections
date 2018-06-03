const now = require('performance-now')

const startTime = now()
const openApiSpec = require('common/dist/openApi.json')
const createLog = require('../../utilities/log')
const createServiceRouter = require('../serviceRouter')
const createApp = require('../app')
const initializeSequelize = require('../sequelize')
const { createIndexBuilder } = require('../searchEngine')
const createModels = require('../sequelize/models')
const createConnectors = require('../connectors')

const createServices = require('../services')
const setupIntegrations = require('../integrations')
const createAuth = require('../auth')

const log = createLog('server')
log.info(`Dependencies required after: ${now() - startTime} milliseconds`)

module.exports = function bootstrap({ config, serviceDefinitions }) {
  const services = createServices({ config, serviceDefinitions })

  const bootstrapStartTime = now()
  const auth = createAuth({ config })

  initializeSequelize({
    config,
  }).then(({ sequelize }) => {
    return createModels({
      config,
      sequelize,
      services,
    })
      .then(({ models }) => {
        log.info(
          `Sequelize initialized after: ${now() - startTime} milliseconds`
        )
        return setupIntegrations({ config })
          .then(integrations => {
            log.info(
              `Integrations initialized after: ${now() -
                startTime} milliseconds`
            )
            return createConnectors({
              config,
              integrations,
              models,
              services,
            })
          })
          .then(({ connectors }) => {
            log.info(
              `Connectors created after: ${now() - startTime} milliseconds`
            )
            return createIndexBuilder({
              config,
              connectors,
              models,
              sequelize,
            }).then(() => {
              if (config.api.active) {
                const serviceRouter = createServiceRouter({
                  auth,
                  config,
                  connectors,
                })
                const app = createApp({
                  auth,
                  config,
                  openApiSpec,
                  routers: [serviceRouter],
                })
                log.info(
                  `App configured after: ${now() - startTime} milliseconds`
                )
                return app.listen(config.api.port, () => {
                  log.info(
                    `Server started after: ${now() -
                      startTime} milliseconds. Bootstrap time: ${now() -
                      bootstrapStartTime}`
                  )
                  log.info(`Api listening to port ${config.api.port}`)
                })
              }
              return null
            })
          })
      })
      .catch(err => {
        throw err
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
