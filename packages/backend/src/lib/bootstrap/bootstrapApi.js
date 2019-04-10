const createCore = require('./utilities/createCore')
const createServiceRouter = require('../serviceRouter')
const createApp = require('../app')
const createAuth = require('../auth')
const createLog = require('../../utilities/log')
const createWorker = require('../worker')

const log = createLog('bootstrap/api')

module.exports = function bootstrapApi({
  env,
  serviceConfigurations,
  serviceOrder,
}) {
  log.info('bootstraping api')
  return createCore({
    env,
    log,
    serviceConfigurations,
    serviceOrder,
  }).then(({ config, operations, schemaInterface, serviceInteractor }) => {
    const openApiSpec = schemaInterface.getOpenApiSpec()

    const auth = createAuth({ config })

    createWorker({
      config,
      serviceInteractor,
    })

    const serviceRouter = createServiceRouter({
      auth,
      config,
      operations,
      serviceInteractor,
    })

    const app = createApp({
      auth,
      config,
      openApiSpec,
      routers: [serviceRouter],
    })

    app.listen(config.api.port, err => {
      if (err) {
        throw err
      }
      log.info('bootstraping api done')
      log.info(`api listening to port: ${config.api.port}`)
    })
  })
}
