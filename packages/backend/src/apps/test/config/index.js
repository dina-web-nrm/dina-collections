const { readKey, readBoolKey } = require('../../../lib/config/env')

const createBaseConfig = require('../../../lib/config/createBaseConfig')

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
