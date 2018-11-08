const createLog = require('backend/src/utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('utilities/runMigrationFunctions')

module.exports = function runMigrationFunctions({
  migrationFunctions,
  catchError = false,
  ...rest
}) {
  return chainPromises(
    migrationFunctions.map(
      ({ migrationFunction, migrationName, resourceName, serviceName }) => {
        return () => {
          log.info(
            `Running migration: ${serviceName} -> ${resourceName} -> ${
              migrationName
            }`
          )
          return migrationFunction({
            ...rest,
          })
            .then(() => {
              log.scope().info(`Done`)
            })
            .catch(err => {
              if (catchError) {
                console.log('err', err)
              }
              throw err
            })
        }
      }
    )
  )
}
