const bootstrapBase = require('./bootstrapBase')
const schemaInterface = require('common/src/schemaInterface')
const createServiceRouter = require('../serviceRouter')
const createApp = require('../app')
const setupJobs = require('./setupJobs')
const createAuth = require('../auth')

const openApiSpec = schemaInterface.getOpenApiSpec()

module.exports = function bootstrapApi({
  env,
  schedulerActive = false,
  serviceDefinitions,
  serviceOrder,
  workerActive = false,
}) {
  const main = ({ config, connectors, log, serviceInteractor }) => {
    const auth = createAuth({ config })

    setupJobs({
      log,
      schedulerActive,
      serviceInteractor,
      workerActive,
    })

    log.info('Starting api')
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

    return new Promise((resolve, reject) => {
      app.listen(config.api.port, err => {
        if (err) {
          return reject(err)
        }

        return resolve({ message: `Api listening to port: ${config.api.port}` })
      })
    })
  }

  return bootstrapBase({
    env,
    main,
    serviceDefinitions,
    serviceOrder,
  })
}
