const { readKey, readBoolKey } = require('./env')

const createConfig = require('./createConfig')

const baseConfig = createConfig({
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
