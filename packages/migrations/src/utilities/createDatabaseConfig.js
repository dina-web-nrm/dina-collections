require('./loadBackendEnv')
const createPostgresDbConfig = require('backend/src/lib/config/createPostgresDbConfig')

const environments = ['test', 'production', 'development']

module.exports = function createDatabaseConfig() {
  return environments.reduce((config, env) => {
    const { database, password, url, username } = createPostgresDbConfig({
      env,
    })

    const host = url.split(':')[0]

    return {
      ...config,
      [env]: {
        database,
        dialect: 'postgres',
        host,
        password,
        username,
      },
    }
  }, {})
}
