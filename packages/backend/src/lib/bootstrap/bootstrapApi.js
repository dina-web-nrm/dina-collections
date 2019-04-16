const createLog = require('../../utilities/log')
const { createWorker } = require('../worker')
const { createCore } = require('./core')
const { createServiceRouter } = require('../serviceRouter')
const { createApp } = require('../app')
const { createAuth } = require('../auth')

const log = createLog('bootstrap/api')

module.exports = function bootstrapApi({ serviceConfigurations }) {
  log.info('bootstraping api')
  return createCore({
    log,
    serviceConfigurations,
  }).then(({ config, openApiSpec, operations, serviceInteractor }) => {
    const auth = createAuth({ config })

    createWorker({
      config,
      serviceInteractor,
    })

    const serviceRouter = createServiceRouter({
      auth,
      config,
      operations,
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
