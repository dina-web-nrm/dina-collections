const createLog = require('../../../utilities/log')

const log = createLog('services/placeService/serviceInteractions')

exports.rebuildInProgress = ({ serviceInteractor }) => {
  return serviceInteractor
    .call({
      operationId: 'searchPlaceGetViewMeta',
    })
    .then(({ data }) => {
      return !!data.attributes.nextVersion
    })
}

exports.createIndexJob = ({
  priority = 0,
  consolidateJobs = true,
  limit,
  rebuild: forceRebuild = false,
  searchPlaceIds = [],
  serviceInteractor,
}) => {
  const limitReached = searchPlaceIds.length >= limit
  if (limitReached) {
    log.debug(
      `createIndexJob: Limit reached (${
        searchPlaceIds.length
      } ids). will rebuild view`
    )
  }
  const rebuild = forceRebuild || limitReached

  if (rebuild) {
    log.debug('createIndexJob: searchPlaceRebuildView')
    return serviceInteractor.call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              group: 'search-index',
              operationId: 'searchPlaceRebuildView',
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
    `createIndexJob: searchPlaceUpdateView. with ids:
      [${searchPlaceIds.join(', ')}]
    `
  )
  return serviceInteractor.call({
    operationId: 'jobCreate',
    request: {
      body: {
        data: {
          attributes: {
            group: 'search-index',
            operationId: 'searchPlaceUpdateView',
            operationRequest: {
              body: {
                data: {
                  attributes: {
                    ids: searchPlaceIds,
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

exports.createUpdateRelatedSearchPlacePostHook = ({ resource, limit = 50 }) => {
  return function updateRelatedSearchPlacePostHook({
    item,
    serviceInteractor,
  }) {
    const { id: updatedResourceId } = item
    log.debug(
      `updateRelatedSearchPlace for resource: ${resource}. id: ${updatedResourceId}`
    )
    return serviceInteractor
      .call({
        operationType: 'query',
        request: {
          body: {
            data: {
              attributes: {
                includeFields: ['id'],
                limit,
                query: {
                  and: [
                    {
                      filter: {
                        filterFunction: 'relatedResources',
                        input: {
                          id: updatedResourceId,
                          type: resource,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        resource: 'searchPlace',
      })
      .then(res => {
        const { data } = res

        return exports.createIndexJob({
          limit,
          searchPlaceIds: data.map(({ id }) => {
            return id
          }),
          serviceInteractor,
        })
      })
  }
}
