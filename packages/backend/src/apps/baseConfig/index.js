const path = require('path')
const { readKey, readBoolKey } = require('../../lib/config/env')

const services = {
  agentService: true,
  authService: true,
  curatedEventService: true,
  curatedListService: true,
  exportService: true,
  jobService: true,
  logService: true,
  placeService: true,
  searchService: true,
  specimenService: true,
  statusService: true,
  storageService: true,
  taxonomyService: true,
}

const integrations = {
  keycloakAdmin: {
    active: readBoolKey('KEYCLOAK_ADMIN_ACTIVE'),
    baseUrl: readKey('KEYCLOAK_AUTH_BASE_URL'),
    password: readKey('KEYCLOAK_ADMIN_PASSWORD'),
    realmName: readKey('KEYCLOAK_REALM_NAME'),
    username: readKey('KEYCLOAK_ADMIN_USERNAME'),
  },
}

const api = {
  active: false,
  mock: {
    active: false,
    generate: false,
    preferred: false,
  },
  port: readKey('API_PORT'),
  validateInput: true,
  validateOutput: true,
}

const initialData = {
  numberOfSpecimens: 0,
}

const db = {
  database: readKey('DB_DATABASE'),
  flushOnRestart: false,
  importData: false,
  password: readKey('DB_PASSWORD'),
  url: readKey('DB_URL'),
  username: readKey('DB_USERNAME'),
}

const auth = {
  active: true,
  'auth-server-url': readKey('AUTH_BASE_URL'),
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
  runApiTests: false,
  runBatchTests: false,
  runDbTests: false,
  testApiUrl: '',
  testAuthUrl: '',
  testPassword: '',
  testUsername: '',
}

const env = {
  isDevelopment: readKey('NODE_ENV') === 'development',
  isProduction: readKey('NODE_ENV') === 'production',
  isTest: readKey('NODE_ENV') === 'test',
}

const jobs = {
  schedulerActive: false,
  schedulerIndexElastic: false,
  workerActive: false,
}

const elasticsearch = {
  flushOnRestart: false,
  url: readKey('ELASTICSEARCH_URL'),
}

const fileInteractor = {
  rootPath: path.join(__dirname, '../../../../../userFiles'),
}

module.exports = {
  api,
  auth,
  db,
  elasticsearch,
  env,
  fileInteractor,
  initialData,
  integrations,
  jobs,
  log,
  services,
  test,
}
