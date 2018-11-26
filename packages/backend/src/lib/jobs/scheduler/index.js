const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/scheduler')

module.exports = function createScheduler({ serviceInteractor }) {
  log.info('Start scheduler')

  return serviceInteractor
    .call({
      operationId: 'searchSpecimenRequestRebuildView',
      request: {
        body: {
          attributes: {
            operationRequest: {
              queryParams: {
                limit: 1000000,
              },
            },
          },
        },
      },
    })
    .then(() => {
      log.info('Adding job success')
    })
    .catch(err => {
      log.err('Adding job fail', err)
    })
}
