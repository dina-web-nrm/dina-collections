const delWrapper = require('../../../wrappers/methods/del')

module.exports = function deleteFactory({ Model }) {
  return delWrapper(({ id }) => {
    const currentItems = Model.get()
    const updatedItems = {
      ...currentItems,
    }
    const item = currentItems[id]

    delete updatedItems[id]

    Model.set(updatedItems)
    return { item }
  })
}
