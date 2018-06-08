module.exports = function getByIdSyncFactory({ Model }) {
  return function getByIdSync({ id } = {}) {
    if (id === undefined) {
      throw new Error('Id required for getById')
    }
    const model = Model.get()
    const item = model[id]
    return item
  }
}
