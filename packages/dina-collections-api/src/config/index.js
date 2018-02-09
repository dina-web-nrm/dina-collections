const dotenv = require('dotenv')

dotenv.config()

const api = {
  mock: {
    active: true,
    generate: true,
    preferred: false,
  },
  port: process.env.API_PORT || 4444,
}

const db = {
  database: process.env.DB_DATABASE || 'postgres',
  flushOnRestart: process.env.FLUSH_ON_RESATART === 'true' || false,
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  url: process.env.DB_URL || '127.0.0.1:5432',
  username: process.env.DB_USERNAME || 'postgres',
}

const disableAuth = process.env.DISABLE_AUTH === 'true'

const auth = {
  active: !disableAuth,
  'auth-server-url':
    process.env.AUTH_BASE_URL || 'https://alpha-cm.dina-web.net/auth',
  'bearer-only': true,
  realm: 'dina',
  resource: 'collections',
  'ssl-required': 'none',
  'use-resource-role-mappings': true,
}

const log = {
  db: false,
  error: true,
  incomingRequest: false,
  outgoingResponse: true,
}

const test = {
  runApiTests: process.env.API_TESTS === 'true',
  runDbTests: process.env.DB_TESTS === 'true',
  testApiUrl: process.env.TEST_API_URL || 'http://localhost:4444',
  testAuthUrl: process.env.TEST_AUTH_URL || 'https://alpha-cm.dina-web.net',
  testPassword: process.env.TEST_PASSWORD || 'xxxx',
  testUsername: process.env.TEST_USERNAME || 'xxxx',
}

const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
}

module.exports = {
  api,
  auth,
  db,
  env,
  log,
  test,
}
