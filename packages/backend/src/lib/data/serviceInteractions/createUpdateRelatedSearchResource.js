const createLog = require('../../../utilities/log')

const log = createLog(
  'lib/data/serviceInteractions/createUpdateRelatedSearchResourcePostHook'
)

module.exports = function createUpdateRelatedSearchResource({
  targetSearchResource,
  createIndexJob,
  limit = 50,
}) {
  return function updateRelatedSearchResource({
    item,
    serviceInteractor,
    srcResource,
  }) {
    const { id: updatedSrcId } = item
    log.debug(
      `updateRelatedSearchResource for src: ${srcResource} -> ${updatedSrcId} and target ${targetSearchResource}`
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
                          id: updatedSrcId,
                          type: srcResource,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        resource: targetSearchResource,
      })
      .then(res => {
        const { data } = res

        return createIndexJob({
          ids: data.map(({ id }) => {
            return id
          }),
          limit,
          serviceInteractor,
        })
      })
  }
}
