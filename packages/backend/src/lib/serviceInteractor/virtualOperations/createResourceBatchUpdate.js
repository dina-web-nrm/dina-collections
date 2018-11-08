const chainPromises = require('common/src/chainPromises')

module.exports = function createResourceBatchUpdate({ call }) {
  return function resourceBatchUpdate({ items, resource }) {
    return chainPromises(
      items
        .filter(item => {
          return !!item
        })

        .map(item => {
          return () => {
            const { id, type } = item
            if (!id) {
              throw new Error(`Id is required`)
            }

            if (type !== resource) {
              throw new Error(`item.type: ${type} !== resource: ${resource}`)
            }

            const request = {
              body: {
                data: item,
              },
              pathParams: {
                id,
              },
            }
            return call({
              operationType: 'update',
              request,
              resource,
            }).then(response => {
              return response.data
            })
          }
        })
    )
  }
}
