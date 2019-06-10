module.exports = function createItem({
  id,
  mapFunction,
  serviceInteractor,
  srcRelationships,
  srcResource,
}) {
  let queryParams

  if (srcRelationships) {
    queryParams = {
      relationships: srcRelationships,
    }
  } else {
    queryParams = {
      relationships: ['all'],
    }
  }

  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id,
        },
        queryParams,
      },

      resource: srcResource,
    })
    .then(response => {
      const item = response && response.data
      if (!item) {
        throw new Error(`Item with id: ${id} not found`)
      }
      return Promise.resolve()
        .then(() => {
          return mapFunction({ items: [item], serviceInteractor })
        })
        .then(updatedItems => {
          if (updatedItems.length !== 1) {
            throw new Error('Map function return wrong number of items')
          }
          return updatedItems[0]
        })
    })
}
