const createLog = require('../../../../../../utilities/log')

const log = createLog(
  'lib/modelFactories/documentModel/methods/bulkCreateFactory'
)

module.exports = function updatePrimaryKeyFactory({ Model, sequelize } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used in test env when creating initial data
  return function updatePrimaryKey(index) {
    log.debug(`Updating primary key sequenze for ${Model.tableName}`)
    const query = `ALTER SEQUENCE "${
      Model.tableName
    }_id_seq" RESTART WITH :index`

    return sequelize.query(query, { replacements: { index } }).then(() => {
      log.debug('Successfully altered sequence')
    })
  }
}
