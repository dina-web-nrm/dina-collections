const createLog = require('../../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/createFactory')

module.exports = function createFactory(
  { Model, schemaVersion, validate } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function create({ doc, foreignKeyObject }) {
    if (!doc) {
      return Promise.reject(new Error('doc not provided'))
    }

    let data = {
      document: doc,
      schemaCompliant: validate ? !validate(doc) : undefined,
      schemaVersion: schemaVersion || undefined,
    }

    if (foreignKeyObject) {
      data = {
        ...data,
        ...foreignKeyObject,
      }
    }

    log.debug(`Creating instance for model ${Model.tableName}`)

    return Model.create(data).then(res => {
      log.debug(
        `Created instance for model ${Model.tableName}. id: ${
          res.dataValues.id
        }`
      )
      return res
    })
  }
}
