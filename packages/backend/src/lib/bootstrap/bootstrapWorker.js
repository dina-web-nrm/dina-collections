const createCore = require('./utilities/createCore')
const createWorker = require('../worker')
const createLog = require('../../utilities/log')

const log = createLog('bootstrap/worker')

module.exports = function bootstrapWorker({
  env,
  serviceConfigurations,
  serviceOrder,
}) {
  log.info(`Start bootstrap core`)
  return createCore({
    env,
    log,
    serviceConfigurations,
    serviceOrder,
  }).then(({ config, serviceInteractor }) => {
    log.info(`Bootstrap core done`)

    if (config.jobs.workerActive) {
      log.info(`Starting worker with role: ${config.jobs.workerRole}`)
      createWorker({
        config,
        serviceInteractor,
      })
    }
  })
}
