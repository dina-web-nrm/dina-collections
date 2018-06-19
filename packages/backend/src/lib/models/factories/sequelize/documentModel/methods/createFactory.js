const createLog = require('../../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/createFactory')

module.exports = function createFactory(
  { Model, schemaVersion, validate } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function create({ allowId = false, doc = {}, foreignKeyObject }) {
    const { relationships, ...attributes } = doc

    let data = {
      document: attributes,
      relationships,
      schemaCompliant: validate ? !validate(doc) : undefined,
      schemaVersion: schemaVersion || undefined,
    }

    if (foreignKeyObject) {
      data = {
        ...data,
        ...foreignKeyObject,
      }
    }

    if (doc.id !== undefined && allowId) {
      data = {
        ...data,
        id: doc.id,
      }
    }

    log.debug(`Creating instance for model ${Model.tableName}`)

    return Model.create(data).then(item => {
      log.debug(
        `Created instance for model ${Model.tableName}. id: ${
          item.dataValues.id
        }`
      )
      return { item }
    })
  }
}
