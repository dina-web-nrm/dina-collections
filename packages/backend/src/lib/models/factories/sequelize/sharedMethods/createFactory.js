const createWrapper = require('../../wrappers/methods/create')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const createLog = require('../../../../../utilities/log')

const log = createLog('lib/modelFactories/documentModel/methods/createFactory')

module.exports = function createFactory({ Model, validate } = {}) {
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
    log.info(`Creating instance for model ${Model.tableName}`)
    return Model.create(data).then(res => {
      log.info(
        `Created instance for model ${Model.tableName}. id: ${
          res.dataValues.id
        }`
      )

      return formatModelItemResponse({ input: res })
    })
  })
}
