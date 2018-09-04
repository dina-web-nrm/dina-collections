const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/worker/execute')

module.exports = function execute({ job, serviceInteractor }) {
  return Promise.resolve().then(() => {
    const operationId = job && job.attributes && job.attributes.operationId
    const operationRequest =
      job && job.attributes && job.attributes.operationRequest
    log.info(
      `Started execute job with id: :${job.id} and operationId: ${operationId}`
    )
    const jobId = job.id
    return serviceInteractor
      .call({
        operationId: 'jobStartJob',
        request: {
          body: {
            data: {},
          },
          pathParams: {
            id: jobId,
          },
        },
      })
      .then(() => {
        const request = operationRequest || {}
        if (!operationId) {
          throw new Error('Operation id is missing')
        }
        return serviceInteractor
          .call({ operationId, request })
          .then(() => {
            log.info(
              `Job with id: :${job.id} and operationId: ${
                operationId
              } finished successfully`
            )
            return serviceInteractor
              .call({
                operationId: 'jobSetJobSuccess',
                request: {
                  body: {
                    data: {},
                  },
                  pathParams: {
                    id: jobId,
                  },
                },
              })
              .then(() => {
                log.info(
                  `Job with id: :${job.id} and operationId: ${
                    operationId
                  } marked as success`
                )
              })
          })
          .catch(err => {
            log.info(
              `Job with id: :${job.id} and operationId: ${operationId} failed`,
              err
            )
            return serviceInteractor
              .call({
                operationId: 'jobSetJobFailed',
                request: {
                  body: {
                    data: {},
                  },
                  pathParams: {
                    id: jobId,
                  },
                },
              })
              .then(() => {
                log.info(
                  `Job with id: :${job.id} and operationId: ${
                    operationId
                  } marked as failed`
                )
              })
          })
      })
  })
}
