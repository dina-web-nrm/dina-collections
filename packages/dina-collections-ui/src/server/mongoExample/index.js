const openApiSpec = require('dina-schema/build/openApi.json')
const createLog = require('./../utilities/log')
const createApi = require('./../lib/api')
const createApp = require('./../lib/app')
const createConfig = require('./config')
const bootstrapMongoose = require('./../lib/mongoose')
const createKeycloak = require('./../lib/auth/keycloak')

const config = createConfig()

const log = createLog('server')

const routeHandlerFiles = [
  'createIndividualGroup',
  'getIndividualGroups',
  'updateIndividualGroup',
]
const routeMockFiles = ['getTaxaByName']

bootstrapMongoose({
  config,
})
  .then(({ controllers }) => {
    const keycloak = createKeycloak({ config })

    const api = createApi({
      basePath: __dirname,
      config,
      controllers,
      keycloak,
      openApiSpec,
      routeHandlerFiles,
      routeMockFiles,
    })

    const app = createApp({
      api,
      config,
      keycloak,
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
