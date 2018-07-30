const createWrapper = require('../../../wrappers/methods/create')
const uuidv1 = require('uuid/v4')

module.exports = function createFactory({ Model }) {
  return createWrapper(({ item }) => {
    const { attributes, id: providedId, internals = {}, relationships } = item
    const id = providedId !== undefined ? providedId : uuidv1()
    const currentItems = Model.get()
    if (providedId && currentItems[providedId]) {
      throw new Error(`Id: ${providedId} already exist`)
    }
    const newItems = {}
    const newItem = { attributes, id, internals }
    if (relationships) {
      newItem.relationships = relationships
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
