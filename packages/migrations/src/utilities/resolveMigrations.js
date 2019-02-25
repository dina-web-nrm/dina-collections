const services = require('backend/src/services')

module.exports = function resolveMigrations({ migrations }) {
  return migrations.map(({ migrationName, resourceName, serviceName }) => {
    const service = services[serviceName]
    const resource =
      service && service.resources && service.resources[resourceName]
    const resolvedMigration =
      resource && resource.migrations && resource.migrations[migrationName]
    if (!resolvedMigration) {
      throw new Error(
        `Cant find migration. serviceName: ${serviceName}, resourceName: ${resourceName}, migrationName: ${migrationName}`
      )
    }

    return {
      ...resolvedMigration,
      migrationName,
      resourceName,
      serviceName,
    }
  })
}
