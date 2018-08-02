const getByIdWrapper = require('../../../wrappers/methods/getById')

module.exports = function getByIdFactory({ Model }) {
  return getByIdWrapper(({ id }) => {
    const currentItems = Model.get()
    const item = currentItems[id] || null
    return { item }
  })
}
