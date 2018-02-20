module.exports = function createFactory({ Model, validate, schemaVersion }) {
  return function create(doc) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    const data = {
      document: doc,
      isCurrentVersion: true,
      schemaCompliant: !validate(doc),
      schemaVersion,
    }

    return Model.create(data).then(newModel => {
      newModel.set('id', newModel.get('versionId'))
      return newModel.save().then(res => {
        return res.dataValues
      })
    })
  }
}
