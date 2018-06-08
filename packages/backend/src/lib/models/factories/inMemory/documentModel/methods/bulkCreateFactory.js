module.exports = function bulkCreateFactory({ Model }) {
  return function bulkCreate({ items = [] }) {
    return Promise.resolve().then(() => {
      const model = Model.get()
      const newItems = {}
      items.forEach(({ doc, id } = {}) => {
        if (id === undefined) {
          throw new Error('Id required for bulk create')
        }

        newItems[id] = { document: doc, id }
      })

      const updatedModel = {
        ...model,
        ...newItems,
      }
      Model.set(updatedModel)
    })
  }
}
