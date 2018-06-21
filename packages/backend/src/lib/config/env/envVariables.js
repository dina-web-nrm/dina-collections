const requiredEnvVariables = [
  'API_PORT',
  'AUTH_BASE_URL',
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
  'INITIAL_DATA_NUMBER_OF_SPECIMENS',
  'LOAD_INITIAL_DATA',
]

const devVariables = ['DISABLE_AUTH']

const testVariables = [
  'API_TESTS',
  'BATCH_TESTS',
  'DB_TESTS',
  'TEST_API_URL',
  'TEST_AUTH_URL',
  'TEST_PASSWORD',
  'TEST_USERNAME',
]

module.exports = {
  devVariables,
  optionalEnvVariables,
  requiredEnvVariables,
  testVariables,
}
