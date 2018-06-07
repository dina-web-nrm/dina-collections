const formatItemResponse = require('../utilities/formatItemResponse')

module.exports = function createFactory({ Model }) {
  return function create({ doc: item = {} } = {}) {
    return Promise.resolve().then(() => {
      if (!item || item.id === undefined) {
        throw new Error('Id required for create')
      }
      const model = Model.get()
      const newItems = {}

      newItems[item.id] = item

      const updatedModel = {
        ...model,
        ...newItems,
      }
      Model.set(updatedModel)
      return formatItemResponse(item)
    })
  }
}
