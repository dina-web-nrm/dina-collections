const requiredEnvVariables = [
  'API_PORT',
  'DB_DATABASE',
  'DB_PASSWORD',
  'DB_URL',
  'DB_USERNAME',
  'ELASTICSEARCH_URL',
  'KEYCLOAK_ADMIN_ACTIVE',
  'KEYCLOAK_ADMIN_PASSWORD',
  'KEYCLOAK_ADMIN_USERNAME',
  'KEYCLOAK_AUTH_BASE_URL',
  'KEYCLOAK_REALM_NAME',
  'NODE_ENV',
]

const optionalEnvVariables = [
  'IMPORT_DATA_NUMBER_OF_SPECIMENS',
  'IMPORT_DATA',
  'SERVER_ALIAS',
  'SLACK_ACTIVE',
  'SLACK_ERROR_WEBHOOK',
  'SLACK_WARNING_WEBHOOK',
  'WORKER_ROLE',
]

const devVariables = ['DISABLE_AUTH', 'RUN_MEMWATCH']

const testVariables = [
  'API_TESTS',
  'BATCH_TESTS',
  'DB_TESTS',
  'TEST_API_URL',
  'TEST_AUTH_URL',
  'TEST_PASSWORD',
  'TEST_SYNC_MODELS',
  'TEST_USERNAME',
]

module.exports = {
  devVariables,
  optionalEnvVariables,
  requiredEnvVariables,
  testVariables,
}
