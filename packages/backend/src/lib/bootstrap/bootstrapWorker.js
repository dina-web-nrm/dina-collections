const createCore = require('./utilities/createCore')
const createWorker = require('../worker')
const createLog = require('../../utilities/log')

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
