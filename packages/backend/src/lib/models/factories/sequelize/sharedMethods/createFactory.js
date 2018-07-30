const createWrapper = require('../../wrappers/methods/create')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/createFactory')

module.exports = function createFactory(
  { Model, schemaVersion, validate } = {}
) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return createWrapper(({ item = {} }) => {
    const { attributes, id, internals, relationships } = item

    const newItem = {
      attributes,
      id,
      relationships,
    }
    let data = {
      document: attributes,
      relationships,
      schemaCompliant: validate ? !validate(newItem) : undefined,
      schemaVersion: schemaVersion || undefined,
    }

    if (internals) {
      data = {
        ...data,
        ...internals,
      }
    }

    if (id !== undefined) {
      data = {
        ...data,
        id,
      }
    }
    log.debug(`Creating instance for model ${Model.tableName}`)
    return Model.create(data).then(res => {
      log.debug(
        `Created instance for model ${Model.tableName}. id: ${
          res.dataValues.id
        }`
      )

      return formatModelItemResponse({ input: res })
    })
  })
}
