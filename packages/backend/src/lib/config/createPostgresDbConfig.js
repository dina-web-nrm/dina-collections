const { readKey } = require('./env')

module.exports = function createDbConfig({ env }) {
  let database
  let allowSync = false
  switch (env) {
    case 'development': {
      database = 'dina_dev'
      break
    }
    case 'test': {
      database = 'dina_test'
      allowSync = true
      break
    }
    case 'production': {
      database = readKey('DB_DATABASE')
      break
    }
    default: {
      throw new Error(`Unknown env: ${env}`)
    }
  }

  return {
    allowSync,
    database,
    password: readKey('DB_PASSWORD'),
    url: readKey('DB_URL'),
    username: readKey('DB_USERNAME'),
    pool: {
      max: 20,
    }
  }
}
