const { readKey, readBoolKey } = require('./env')

const createBaseConfig = require('./createBaseConfig')

const baseConfig = createBaseConfig({
  env: 'test',
})

module.exports = {
  ...baseConfig,
  test: {
    runApiTests: readBoolKey('API_TESTS'),
    runBatchTests: readBoolKey('BATCH_TESTS'),
    runDbTests: readBoolKey('TEST_DB'),
    testApiUrl: `http://127.0.0.1:${readKey('API_PORT')}`,
  },
}
