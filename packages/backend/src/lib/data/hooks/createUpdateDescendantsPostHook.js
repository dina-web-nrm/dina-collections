const createLog = require('../../../utilities/log')

const log = createLog('lib/data/hooks/createUpdateDescendantsPostHook')

module.exports = function createUpdateDescendantsPostHook({
  createIndexJob,
  targetSearchResource,
  srcResource,
  limit,
}) {
  return function updateDescendantsPostHook({ item, serviceInteractor }) {
    const { id: updatedSrcId } = item
    log.debug(
      `updateDescendantsPostHook for src: ${srcResource} -> ${updatedSrcId} and target ${targetSearchResource}`
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
                        filterFunction: 'ancestorIds',
                        input: { value: updatedSrcId },
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
