const runMigrationFunctions = require('./runMigrationFunctions')
const resolveMigrations = require('./resolveMigrations')
const extractSchemaFunctions = require('./extractSchemaFunctions')

module.exports = function createPgMigrations({ migrations: migrationsInput }) {
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

  const up = (queryInterface, Sequelize) => {
    return runMigrationFunctions({
      migrationFunctions: schemaUpFunctions,
      queryInterface,
      Sequelize,
    }).catch(err => {
      return runMigrationFunctions({
        catchError: true,
        migrationFunctions: schemaDownFunctions,
        queryInterface,
        Sequelize,
      }).then(() => {
        throw err
      })
    })
  }

  const down = (queryInterface, Sequelize) => {
    return runMigrationFunctions({
      migrationFunctions: schemaDownFunctions,
      queryInterface,
      Sequelize,
    }).then(() => {})
  }

  return {
    down,
    up,
  }
}
