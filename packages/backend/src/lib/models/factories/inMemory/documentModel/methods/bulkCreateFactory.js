module.exports = function bulkCreateFactory({ Model }) {
  return function bulkCreate(items = []) {
    return Promise.resolve().then(() => {
      const model = Model.get()
      const newItems = {}
      items.forEach(item => {
        if (!item || item.id === undefined) {
          throw new Error('Id required for bulk create')
        }
        newItems[item.id] = item
      })

      const updatedModel = {
        ...model,
        ...newItems,
      }
      Model.set(updatedModel)
    })
  }
}
