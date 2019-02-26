const parameterMap = {
  api: {
    port: 'API_PORT',
  },
  auth: {
    'auth-server-url': 'KEYCLOAK_AUTH_BASE_URL',
    disableAuth: 'DISABLE_AUTH',
  },
  db: {
    database: 'DB_DATABASE',
    importData: 'IMPORT_DATA',
    password: 'DB_PASSWORD',
    url: 'DB_URL',
    username: 'DB_USERNAME',
  },
  elasticsearch: {
    url: 'ELASTICSEARCH_URL',
  },
  env: {
    nodeEnv: 'NODE_ENV',
  },
  initialData: {
    numberOfSpecimens: 'IMPORT_DATA_NUMBER_OF_SPECIMENS',
  },
  jobs: {
    schedulerActive: 'SCHEDULER_ACTIVE',
    workerActive: 'WORKER_ACTIVE',
  },
  keycloakAdmin: {
    active: 'KEYCLOAK_ADMIN_ACTIVE',
    baseUrl: 'KEYCLOAK_AUTH_BASE_URL',
    password: 'KEYCLOAK_ADMIN_PASSWORD',
    realmName: 'KEYCLOAK_REALM_NAME',
    username: 'KEYCLOAK_ADMIN_USERNAME',
  },
  test: {
    runApiTests: 'API_TESTS',
    runBatchTests: 'BATCH_TESTS',
    runDbTests: 'TEST_DB',
    testApiUrl: 'TEST_API_URL',
    testAuthUrl: 'TEST_AUTH_URL',
    testPassword: 'TEST_PASSWORD',
    testUsername: 'TEST_USERNAME',
  },
}

module.exports = parameterMap
