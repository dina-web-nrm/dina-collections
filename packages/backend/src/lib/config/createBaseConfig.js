const schemaInterface = require('common/src/schemaInterface')
const findRootPath = require('common/src/fs/findRootPath')
const { ensureNodeEnv, readKey, readBoolKey } = require('../../lib/config/env')
const createPostgresDbConfig = require('./createPostgresDbConfig')

const dataModelVersion = schemaInterface.getDataModelVersion()

const dataModel = {
  version: dataModelVersion,
}

const services = {
  agentService: true,
  authService: true,
  curatedEventService: true,
  curatedListService: true,
  exportService: true,
  historyService: true,
  identifierService: true,
  jobService: true,
  migrationService: true,
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
    baseUrl: `${readKey('KEYCLOAK_AUTH_BASE_URL')}/auth`,
    password: readKey('KEYCLOAK_ADMIN_PASSWORD'),
    realmName: readKey('KEYCLOAK_REALM_NAME'),
    username: readKey('KEYCLOAK_ADMIN_USERNAME'),
  },
  slack: {
    active: readBoolKey('SLACK_ACTIVE'),
    errorWebhook: readKey('SLACK_ERROR_WEBHOOK'),
    warningWebhook: readKey('SLACK_WARNING_WEBHOOK'),
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
  numberOfSpecimens: readKey('IMPORT_DATA_NUMBER_OF_SPECIMENS'),
}

const auth = {
  active: true,
  'auth-server-url': `${readKey('KEYCLOAK_AUTH_BASE_URL')}/auth`,
  'bearer-only': true,
  realm: readKey('KEYCLOAK_REALM_NAME'),
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
  runMemwatch: readBoolKey('RUN_MEMWATCH'),
  testApiUrl: '',
  testAuthUrl: '',
  testPassword: '',
  testUsername: '',
}

const env = {
  env: readKey('NODE_ENV'),
  isDevelopment: readKey('NODE_ENV') === 'development',
  isProduction: readKey('NODE_ENV') === 'production',
  isTest: readKey('NODE_ENV') === 'test',
  serverAlias: readKey('SERVER_ALIAS'),
}

const jobs = {
  schedulerActive: false,
  schedulerIndexElastic: false,
  workerActive: false,
  workerRole: readKey('WORKER_ROLE'),
}

const elasticsearch = {
  url: readKey('ELASTICSEARCH_URL'),
}

const fileInteractor = {
  rootPath: findRootPath(),
}

const baseConfig = {
  api,
  auth,
  dataModel,
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

module.exports = function createBaseConfig({ env: nodeEnv }) {
  let envConfig = baseConfig
  ensureNodeEnv(nodeEnv)
  const db = createPostgresDbConfig({
    env: readKey('NODE_ENV'),
  })
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    const disableAuth = nodeEnv === 'test' || readBoolKey('DISABLE_AUTH')
    if (disableAuth) {
      envConfig = {
        ...envConfig,
        auth: {
          ...envConfig.auth,
          active: !disableAuth,
        },
      }
    }
  }

  if (nodeEnv === 'test') {
    const syncModels = readBoolKey('TEST_SYNC_MODELS')
    if (syncModels) {
      envConfig = {
        ...envConfig,
        test: {
          ...envConfig.test,
          syncModels,
        },
      }
    }
  }

  return {
    ...envConfig,
    db,
  }
}
