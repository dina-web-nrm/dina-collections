const openApiSpec = require('common/dist/openApi.json')
const createLog = require('../../utilities/log')
const serviceRouterFactory = require('../../lib/api/serviceRouterFactory')
const createApp = require('../../lib/api/appFactory')
const bootstrapPostgres = require('../../lib/postgres')
const setupModels = require('../../lib/postgres/models/setupModels')
const createConnectors = require('../../lib/connectors')
const config = require('./config')
const serviceDefinitions = require('../../services')

const log = createLog('server')

const services = serviceDefinitions

bootstrapPostgres({
  config,
})
  .then(({ sequelize }) => {
    return setupModels({
      config,
      sequelize,
      services,
    })
  })
  .then(({ models }) => {
    return createConnectors({ config, models, services })
  })
  .then(({ connectors }) => {
    const serviceRouter = serviceRouterFactory({
      config,
      connectors,
    })
    const app = createApp({
      config,
      openApiSpec,
      routers: [serviceRouter],
    })
    return app.listen(config.api.port, () => {
      log.info(`Api listening to port ${config.api.port}`)
    })
  })
  .catch(err => {
    throw err
  })

process.on('uncaughtException', err => {
  log.crit('uncaughtException process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})

process.on('unhandledRejection', err => {
  log.crit('unhandledRejection process exiting in 5000 ms')
  log.crit(err.stack)
  setTimeout(() => {
    process.exit(1)
  }, 10000)
})
