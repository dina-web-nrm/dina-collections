const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/models/factories/sequelize/simpleSqlModel/methods/createFactory'
)

module.exports = function createFactory({ Model, schemaVersion } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return function create({ doc = {} }) {
    const data = { ...doc, schemaVersion }

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
