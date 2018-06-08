module.exports = function deleteFactory({ Model }) {
  return function del({ id } = {}) {
    return Promise.resolve().then(() => {
      if (id === undefined) {
        throw new Error('Id required for deactivate')
      }
      const model = Model.get()
      const updatedModel = {
        ...model,
      }
      const item = model[id]

      delete updatedModel[id]

      Model.set(updatedModel)
      return item
    })
  }
}
