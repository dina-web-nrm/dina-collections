const createLog = require('../../../utilities/log')

const log = createLog('services/searchService/serviceInteractions')

exports.rebuildInProgress = ({ serviceInteractor }) => {
  return serviceInteractor
    .call({
      operationId: 'searchSpecimenGetViewMeta',
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
  searchSpecimenIds = [],
  serviceInteractor,
}) => {
  const limitReached = searchSpecimenIds.length >= limit
  if (limitReached) {
    log.debug(
      `createIndexJob: Limit reached (${
        searchSpecimenIds.length
      } ids). will rebuild view`
    )
  }
  const rebuild = forceRebuild || limitReached

  if (rebuild) {
    log.debug('createIndexJob: searchSpecimenRebuildView')
    return serviceInteractor.call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              group: 'search-index',
              operationId: 'searchSpecimenRebuildView',
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
    `createIndexJob: searchSpecimenUpdateView. with ids:
      [${searchSpecimenIds.join(', ')}]
    `
  )
  return serviceInteractor.call({
    operationId: 'jobCreate',
    request: {
      body: {
        data: {
          attributes: {
            group: 'search-index',
            operationId: 'searchSpecimenUpdateView',
            operationRequest: {
              body: {
                data: {
                  attributes: {
                    ids: searchSpecimenIds,
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

exports.createUpdateRelatedSearchSpecimensPostHook = ({
  resource,
  limit = 50,
}) => {
  return function updateRelatedSearchSpecimensPostHook({
    item,
    serviceInteractor,
  }) {
    const { id: updatedResourceId } = item
    log.debug(
      `updateRelatedSearchSpecimens for resource: ${resource}. id: ${
        updatedResourceId
      }`
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
        resource: 'searchSpecimen',
      })
      .then(res => {
        const { data } = res

        return exports.createIndexJob({
          limit,
          searchSpecimenIds: data.map(({ id }) => {
            return id
          }),
          serviceInteractor,
        })
      })
  }
}
