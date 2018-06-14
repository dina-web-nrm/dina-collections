module.exports = function getByIdFactory({ Model }) {
  return function getById({ id } = {}) {
    return Promise.resolve().then(() => {
      if (id === undefined) {
        throw new Error('Id required for getById')
      }
      const currentItems = Model.get()
      const item = currentItems[id]
      return item || null
    })
  }
}
