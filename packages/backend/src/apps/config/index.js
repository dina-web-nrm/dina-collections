const dotenv = require('dotenv')

dotenv.config()

const services = {}

const integrations = {
  keycloakAdmin: {
    active: process.env.KEYCLOAK_ADMIN_ACTIVE === 'true' || false,
    baseUrl:
      process.env.KEYCLOAK_AUTH_BASE_URL ||
      'https://alpha-keycloak.dina-web.net/auth',
    password: process.env.KEYCLOAK_ADMIN_PASSWORD || 'admin',
    realmName: process.env.KEYCLOAK_REALM_NAME || 'dina',
    username: process.env.KEYCLOAK_ADMIN_USERNAME || 'admin',
  },
}

const api = {
  active: true,
  mock: {
    active: true,
    generate: true,
    preferred: false,
  },
  port: process.env.API_PORT || 4444,
  validateInput: true,
  validateOutput: true,
}

const initialData = {
  numberOfSpecimens: process.env.INITIAL_DATA_NUMBER_OF_SPECIMENS || 100,
}

const db = {
  database: process.env.DB_DATABASE || 'postgres',
  flushOnRestart: process.env.FLUSH_ON_RESTART === 'true' || false,
  loadInitialData: process.env.LOAD_INITIAL_DATA === 'true' || false,
  loadInitialDataServiceOrder: [
    'agentService',
    'curatedListService',
    'placeService',
    'storageService',
    'taxonomyService',
  ],
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  url: process.env.DB_URL || '127.0.0.1:5432',
  username: process.env.DB_USERNAME || 'postgres',
}

const elasticsearch = {
  flushOnRestart: false,
  loadInitialData: process.env.LOAD_INITIAL_DATA === 'true' || false,
  url: process.env.ELASTICSEARCH_URL || '127.0.0.1:9200',
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
  incomingRequest: true,
  outgoingResponse: false,
}

const test = {
  runApiTests: process.env.API_TESTS === 'true',
  runBatchTests: process.env.BATCH_TESTS === 'true',
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

const searchIndexBuilder = {
  active: false,
}

module.exports = {
  api,
  auth,
  db,
  elasticsearch,
  env,
  initialData,
  integrations,
  log,
  searchIndexBuilder,
  services,
  test,
}
