module.exports = function getByIdSyncFactory({ Model }) {
  return function getByIdSync({ id } = {}) {
    if (id === undefined) {
      throw new Error('Id required for getById')
    }
    const currentItems = Model.get()
    const item = currentItems[id] || null
    return { item }
  }
}
