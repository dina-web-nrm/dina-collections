const createPgMigrations = require('../utilities/createPgMigrations')

module.exports = createPgMigrations({
  migrations: [
    {
      migrationName: 'addIndex',
      resourceName: 'specimen',
      serviceName: 'specimenService',
    },
    {
      migrationName: 'addIndex',
      resourceName: 'storageLocation',
      serviceName: 'storageService',
    },
  ],
})
