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
  // TODO 'dont allow id like this but create another metgod'
  return function create(doc, id) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    const data = {
      document: doc,
      id,
      isCurrentVersion: true,
      schemaCompliant: validate ? !validate(doc) : undefined,
      schemaVersion: schemaVersion || undefined,
    }

    log.debug(`Create instance for model ${Model.tableName}`)
    return Model.create(data).then(newModel => {
      newModel.set('id', newModel.get('versionId'))
      return newModel.save().then(res => {
        log.debug(
          `Created instance for model ${Model.tableName}. id: ${
            res.dataValues.id
          }, versionId: ${res.dataValues.versionId}`
        )
        return res.dataValues
      })
    })
  }
}
