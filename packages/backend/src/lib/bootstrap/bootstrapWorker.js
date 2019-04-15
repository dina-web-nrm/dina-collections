const createLog = require('../../utilities/log')
const { createWorker } = require('../worker')
const { createCore } = require('./core')

const log = createLog('bootstrap/worker')

module.exports = function bootstrapWorker({ env, serviceConfigurations }) {
  log.info('bootstraping worker')
  return createCore({
    env,
    log,
    serviceConfigurations,
  }).then(({ config, serviceInteractor }) => {
    createWorker({
      config,
      serviceInteractor,
    })
    log.info('bootstraping worker done')
  })
}
