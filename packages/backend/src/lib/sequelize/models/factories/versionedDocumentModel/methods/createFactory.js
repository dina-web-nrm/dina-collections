const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/versionedDocumentModel/methods/createFactory'
)

module.exports = function createFactory(
  { Model, validate, schemaVersion } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  Model.hook('afterCreate', newModel => {
    // This means that it already has an id and this id should not be overwritten
    if (newModel.dataValues.id) {
      return newModel
    }
    newModel.set('id', newModel.get('versionId'))
    return newModel.save()
  })

  // TODO 'dont allow id like this but create another metgod'
  return function create(doc, versionId) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    const data = {
      document: doc,
      isCurrentVersion: true,
      schemaCompliant: validate ? !validate(doc) : undefined,
      schemaVersion: schemaVersion || undefined,
      versionId,
    }

    return Model.create(data).then(newModel => {
      log.debug(
        `Created instance for model ${Model.tableName}. id: ${
          newModel.dataValues.id
        }, versionId: ${newModel.dataValues.versionId}`
      )

      return newModel.dataValues
    })
  }
}
