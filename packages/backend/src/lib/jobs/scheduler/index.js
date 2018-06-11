const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/scheduler')

module.exports = function createScheduler({ serviceInteractor }) {
  log.info('Start scheduler')
  serviceInteractor
    .call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              operationId: 'searchSpecimenRebuildView',
            },
          },
        },
      },
    })
    .then(() => {
      log.info('Adding job success')
    })
    .catch(() => {
      log.err('Adding job fail')
    })
}
