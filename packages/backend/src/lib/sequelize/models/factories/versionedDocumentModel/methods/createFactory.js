const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/versionedDocumentModel/methods/createFactory'
)

module.exports = function createFactory(
  { Model, schemaVersion, validate } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }
  return function create(doc) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    const data = {
      document: doc,
      isCurrentVersion: true,
      schemaCompliant: validate ? !validate(doc) : undefined,
      schemaVersion: schemaVersion || undefined,
    }
    log.debug(`Creating instance for model ${Model.tableName}`)

    return Model.create(data).then(newModel => {
      newModel.set('id', newModel.get('versionId'))
      return newModel.save().then(res => {
        log.debug(
          `Created instance for model ${Model.tableName}. id: ${
            res.dataValues.id
          }, versionId: ${res.dataValues.versionId}`
        )
        return res
      })
    })
  }
}
