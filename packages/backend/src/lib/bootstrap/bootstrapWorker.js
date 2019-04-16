const createLog = require('../../utilities/log')
const { createWorker } = require('../worker')
const { createCore } = require('./core')

const log = createLog('bootstrap/worker')

module.exports = function bootstrapWorker({ serviceConfigurations }) {
  log.info('bootstraping worker')
  return createCore({
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
