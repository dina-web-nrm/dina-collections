const openApiSpec = require('common/dist/openApi.json')
const createLog = require('../../utilities/log')
const createServiceRouter = require('../../lib/serviceRouter')
const createApp = require('../../lib/app')
const setupPostgres = require('../../lib/postgres')
const createModels = require('../../lib/postgres/models/setupModels')
const createConnectors = require('../../lib/connectors')
const serviceDefinitions = require('../../services')
const createServices = require('../../lib/services')

const config = require('./config')

const log = createLog('server')

const services = createServices({ config, serviceDefinitions })

setupPostgres({
  config,
})
  .then(({ sequelize }) => {
    return createModels({
      config,
      sequelize,
      services,
    })
  })
  .then(({ models }) => {
    return createConnectors({ config, models, services })
  })
  .then(({ connectors }) => {
    const serviceRouter = createServiceRouter({
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
