module.exports = function createFactory({ Model }) {
  return function create({ doc } = {}) {
    return Promise.resolve().then(() => {
      const { id } = doc
      if (id === undefined) {
        throw new Error('Id required for create')
      }
      const currentItems = Model.get()
      const newItems = {}
      const item = { document: doc, id }
      newItems[id] = item

      const updatedItems = {
        ...currentItems,
        ...newItems,
      }
      Model.set(updatedItems)
      return { item }
    })
  }
}
