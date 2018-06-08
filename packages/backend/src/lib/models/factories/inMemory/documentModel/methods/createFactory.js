module.exports = function createFactory({ Model }) {
  return function create({ doc } = {}) {
    return Promise.resolve().then(() => {
      const { id } = doc
      if (id === undefined) {
        throw new Error('Id required for create')
      }
      const model = Model.get()
      const newItems = {}
      const item = { document: doc, id }
      newItems[id] = item

      const updatedModel = {
        ...model,
        ...newItems,
      }
      Model.set(updatedModel)
      return item
    })
  }
}
