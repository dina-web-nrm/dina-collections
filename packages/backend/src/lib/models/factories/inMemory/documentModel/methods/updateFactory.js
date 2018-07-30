const mergeRelationships = require('../../../utilities/mergeRelationships')
const updateWrapper = require('../../../wrappers/methods/update')
const backendError404 = require('common/src/error/errorFactories/backendError404')

module.exports = function updateFactory({ Model }) {
  return updateWrapper(({ item = {}, id }) => {
    const { attributes, internals = {}, relationships } = item

    const currentItems = Model.get()

    const oldItem = currentItems[id]
    if (!oldItem) {
      backendError404({
        code: 'RESOURCE_NOT_FOUND_ERROR',
        detail: `Not found for id ${id}`,
      })
    }
    const newItems = {}
    const mergedRelationships = mergeRelationships(
      oldItem.relationships,
      relationships
    )

    const newItem = {
      attributes,
      id,
      internals,
      relationships: mergedRelationships,
    }

    newItems[id] = newItem

    const updatedItems = {
      ...currentItems,
      ...newItems,
    }
    Model.set(updatedItems)
    return { item: newItem }
  })
}
