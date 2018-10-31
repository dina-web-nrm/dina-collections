const setupServiceInteractor = require('./setupServiceInteractor')
const runMigrationFunctions = require('./runMigrationFunctions')
const resolveMigrations = require('./resolveMigrations')
const extractSchemaFunctions = require('./extractSchemaFunctions')

module.exports = function createMigrations({
  dataModelVersion,
  migrations: migrationsInput,
}) {
  if (!dataModelVersion) {
    throw new Error('Have to provide dataModelVersion')
  }
  const migrations = resolveMigrations({ migrations: migrationsInput })
  const reversedMigrations = [...migrations].reverse()
  const schemaUpFunctions = extractSchemaFunctions({
    key: 'up',
    migrations,
  })
  const schemaDownFunctions = extractSchemaFunctions({
    key: 'down',
    migrations: reversedMigrations,
  })

  const dataUpFunctions = extractSchemaFunctions({
    key: 'upData',
    migrations,
  })
  const dataDownFunctions = extractSchemaFunctions({
    key: 'downData',
    migrations: reversedMigrations,
  })

  const up = (queryInterface, Sequelize) => {
    return runMigrationFunctions({
      migrationFunctions: schemaUpFunctions,
      queryInterface,
      Sequelize,
    })
      .catch(err => {
        return runMigrationFunctions({
          catchError: true,
          migrationFunctions: schemaDownFunctions,
          queryInterface,
          Sequelize,
        }).then(() => {
          throw err
        })
      })

      .then(() => {
        if (!dataUpFunctions.length) {
          return null
        }

        return setupServiceInteractor({ dataModelVersion }).then(
          serviceInteractor => {
            return runMigrationFunctions({
              migrationFunctions: dataUpFunctions,
              queryInterface,
              Sequelize,
              serviceInteractor,
            })
          }
        )
      })
  }

  const down = (queryInterface, Sequelize) => {
    return runMigrationFunctions({
      migrationFunctions: schemaDownFunctions,
      queryInterface,
      Sequelize,
    }).then(() => {
      return setupServiceInteractor({ dataModelVersion }).then(
        serviceInteractor => {
          return runMigrationFunctions({
            migrationFunctions: dataDownFunctions,
            queryInterface,
            Sequelize,
            serviceInteractor,
          })
        }
      )
    })
  }

  return {
    down,
    up,
  }
}
