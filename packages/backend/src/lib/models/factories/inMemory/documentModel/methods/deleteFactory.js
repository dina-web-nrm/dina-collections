module.exports = function deleteFactory({ Model }) {
  return function del({ id } = {}) {
    return Promise.resolve().then(() => {
      if (id === undefined) {
        throw new Error('Id required for deactivate')
      }
      const currentItems = Model.get()
      const updatedItems = {
        ...currentItems,
      }
      const item = currentItems[id]

      delete updatedItems[id]

      Model.set(updatedItems)
      return item
    })
  }
}
