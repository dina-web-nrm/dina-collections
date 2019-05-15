const createLog = require('../../../utilities/log')

const log = createLog('lib/data/serviceInteractions/createCreateIndexJob')

module.exports = function createCreateIndexJob({
  rebuildViewOperationId,
  updateViewOperationId,
}) {
  return function createIndexJob({
    priority = 0,
    consolidateJobs = true,
    limit,
    rebuild: forceRebuild = false,
    ids = [],
    serviceInteractor,
  }) {
    const limitReached = ids.length >= limit
    if (limitReached) {
      log.debug(
        `createIndexJob: Limit reached (${ids.length} ids). will rebuild view`
      )
    }
    const rebuild = forceRebuild || limitReached

    if (rebuild) {
      log.debug(`createIndexJob: ${rebuildViewOperationId}`)
      return serviceInteractor.call({
        operationId: 'jobCreate',
        request: {
          body: {
            data: {
              attributes: {
                group: 'search-index',
                operationId: rebuildViewOperationId,
                operationRequest: {
                  queryParams: {
                    consolidateJobs,
                    force: true,
                    limit: 100000,
                  },
                },
                priority,
              },
            },
          },
        },
        resource: 'job',
      })
    }
    log.debug(
      `createIndexJob: ${updateViewOperationId}. with ids:
      [${ids.join(', ')}]
    `
    )
    return serviceInteractor.call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              group: 'search-index',
              operationId: updateViewOperationId,
              operationRequest: {
                body: {
                  data: {
                    attributes: {
                      ids,
                    },
                  },
                },
                queryParams: {
                  consolidateJobs,
                },
              },
              priority,
            },
          },
        },
      },
      resource: 'job',
    })
  }
}
