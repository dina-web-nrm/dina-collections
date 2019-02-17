const createDatamodelVersionMigration = require('../utilities/createDatamodelVersionMigration')

module.exports = createDatamodelVersionMigration({
  nextVersion: '0.2.2',
  prevVersion: '0.2.1',
})
