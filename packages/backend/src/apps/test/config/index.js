const baseConfig = require('../../baseConfig')

const { readKey, readBoolKey } = require('../../../lib/config/env')

module.exports = {
  ...baseConfig,
  test: {
    runApiTests: readBoolKey('API_TESTS'),
    runBatchTests: readBoolKey('BATCH_TESTS'),
    runDbTests: readBoolKey('DB_TESTS'),
    testApiUrl: readKey('TEST_API_URL'),
  },
}
