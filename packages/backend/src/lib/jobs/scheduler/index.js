const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/scheduler')

module.exports = function createScheduler({ config, serviceInteractor }) {
  log.info('Start scheduler')

  if (config.jobs.schedulerIndexElastic) {
    return serviceInteractor
      .call({ operationId: 'searchSpecimenRebuildView', request: {} })
      .then(() => {
        log.info('Adding job success')
        process.exit(0)
      })
      .catch(err => {
        log.err('Adding job fail', err)
      })
  }

  return serviceInteractor
    .call({ operationId: 'searchSpecimenRequestRebuildView', request: {} })
    .then(() => {
      log.info('Adding job success')
    })
    .catch(err => {
      log.err('Adding job fail', err)
    })
}
