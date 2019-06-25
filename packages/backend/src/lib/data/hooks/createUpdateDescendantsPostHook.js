const createLog = require('../../../utilities/log')

const log = createLog('lib/data/hooks/createUpdateDescendantsPostHook')

module.exports = function createUpdateDescendantsPostHook({
  createIndexJob,
  targetSearchResource,
  srcResource,
  limit,
}) {
  return function updateDescendantsPostHook({
    item,
    request,
    serviceInteractor,
  }) {
    let updatedSrcId = request.pathParams.id

    if (!updatedSrcId) {
      updatedSrcId = item.id
    }

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

        const ids = [
          updatedSrcId,
          ...data.map(({ id }) => {
            return id
          }),
        ]
        if (item.id !== updatedSrcId) {
          ids.push(item.id)
        }

        return createIndexJob({
          ids,
          limit,
          serviceInteractor,
        })
      })
  }
}
