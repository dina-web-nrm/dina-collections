const createDatamodelVersionMigration = require('../utilities/createDatamodelVersionMigration')

module.exports = createDatamodelVersionMigration({
  nextVersion: '0.4.3',
  prevVersion: '0.4.2',
})
