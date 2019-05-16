const createLog = require('../../../utilities/log')

const log = createLog(
  'lib/data/serviceInteractions/createUpdateRelatedSearchResourcePostHook'
)

exports.createUpdateRelatedSearchResourcePostHook = ({
  srcResource,
  targetSearchResource,
  createIndexJob,
  limit = 50,
}) => {
  return function updateRelatedSearchResourcePostHook({
    item,
    serviceInteractor,
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
