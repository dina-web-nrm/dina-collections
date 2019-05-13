const createLog = require('../../../utilities/log')

const log = createLog('services/specimenService/serviceInteractions')

const {
  createRebuildInProgress,
  createCreateIndexJob,
} = require('../../../lib/data/serviceInteractions')

exports.rebuildInProgress = createRebuildInProgress({
  operationId: 'searchSpecimenGetViewMeta',
})

exports.createIndexJob = createCreateIndexJob({
  rebuildViewOperationId: 'searchSpecimenRebuildView',
  updateViewOperationId: 'searchSpecimenUpdateView',
})

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
      `updateRelatedSearchSpecimens for resource: ${resource}. id: ${updatedResourceId}`
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
