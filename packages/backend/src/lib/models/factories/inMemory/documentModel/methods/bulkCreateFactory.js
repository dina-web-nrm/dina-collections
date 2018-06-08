module.exports = function bulkCreateFactory({ Model }) {
  return function bulkCreate({ items = [] }) {
    return Promise.resolve().then(() => {
      const currentItems = Model.get()
      const newItems = {}
      items.forEach(({ doc, id } = {}) => {
        if (id === undefined) {
          throw new Error('Id required for bulk create')
        }

        newItems[id] = { document: doc, id }
      })

      const updateItems = {
        ...currentItems,
        ...newItems,
      }
      Model.set(updateItems)
    })
  }
}
