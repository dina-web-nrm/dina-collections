const openApiSpec = require('dina-shared/dist/openApi.json')
const createLog = require('./../utilities/log')
const createApi = require('./../lib/api')
const createApp = require('./../lib/app')
const config = require('../config')
const bootstrapPostgres = require('./../lib/postgres')
const createKeycloak = require('./../lib/auth/keycloak')
const modules = require('./modules')

const log = createLog('server')

bootstrapPostgres({
  config,
  modules,
})
  .then(({ controllers }) => {
    const keycloak = createKeycloak({ config })

    const api = createApi({
      config,
      controllers,
      keycloak,
      modules,
      openApiSpec,
    })

    const app = createApp({
      api,
      config,
      keycloak,
      openApiSpec,
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
