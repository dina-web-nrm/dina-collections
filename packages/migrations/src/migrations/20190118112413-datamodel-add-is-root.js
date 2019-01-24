const createDatamodelVersionMigration = require('../utilities/createDatamodelVersionMigration')

module.exports = createDatamodelVersionMigration({
  nextVersion: '0.2.0',
  prevVersion: '0.1.0',
})
