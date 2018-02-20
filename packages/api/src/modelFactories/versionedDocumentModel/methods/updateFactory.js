const { diff } = require('deep-diff')

module.exports = function updateFactory({
  getById,
  Model,
  schemaVersion,
  validate,
}) {
  return function update({ doc, id } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    return getById({ id, raw: false }).then(existingModel => {
      if (!existingModel) {
        const error = new Error(`Not found for id ${id}`)
        error.status = 404
        return Promise.reject(error)
      }
      const storedData = existingModel.get()
      const newModel = {
        ...storedData,
        diff: diff(storedData.document, doc),
        document: doc,
        isCurrentVersion: true,
        schemaCompliant: !validate(doc),
        schemaVersion,
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
