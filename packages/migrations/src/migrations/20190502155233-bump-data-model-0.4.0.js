const createDatamodelVersionMigration = require('../utilities/createDatamodelVersionMigration')

module.exports = createDatamodelVersionMigration({
  nextVersion: '0.4.0',
  prevVersion: '0.3.0',
})
