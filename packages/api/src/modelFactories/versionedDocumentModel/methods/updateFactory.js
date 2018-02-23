const { diff } = require('deep-diff')

module.exports = function updateFactory({
  getById,
  Model,
  schemaVersion,
  validate,
}) {
  return function update({ doc, id, foreignKeyName, foreignKeyValue } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return getById({ id, raw: false }).then(existingModel => {
      if (!existingModel) {
        const error = new Error(`Not found for id ${id}`)
        error.status = 404
        return Promise.reject(error)
      }
      const storedData = existingModel.get()

      let newModel = {
        ...storedData,
        diff: null,
        isCurrentVersion: true,
      }
      if (doc !== undefined) {
        newModel = {
          ...newModel,
          diff: diff(storedData.document, doc),
          document: doc,
          schemaCompliant: !validate(doc),
          schemaVersion,
        }
      }

      if (foreignKeyName) {
        newModel = {
          ...newModel,
          [foreignKeyName]: foreignKeyValue,
        }
      }
      delete newModel.versionId

      existingModel.set({ isCurrentVersion: false })
      return existingModel.save().then(() => {
        return Model.create(newModel).then(savedModel => {
          return savedModel.dataValues
        })
      })
    })
  }
}
