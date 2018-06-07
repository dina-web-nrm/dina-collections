const formatItemResponse = require('../utilities/formatItemResponse')

module.exports = function getByIdFactory({ Model }) {
  return function getById({ id } = {}) {
    return Promise.resolve().then(() => {
      if (id === undefined) {
        throw new Error('Id required for getById')
      }
      const model = Model.get()
      const item = model[id]
      return item ? formatItemResponse(item) : null
    })
  }
}
