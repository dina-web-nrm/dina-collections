const { readKey, readBoolKey } = require('../../../lib/config/env')
const baseConfig = require('../../baseConfig')

module.exports = {
  ...baseConfig,
  db: {
    ...baseConfig.db,
    flushOnRestart: true,
    loadInitialData: readBoolKey('LOAD_INITIAL_DATA'),
  },
  elasticsearch: {
    ...baseConfig.elasticsearch,
    flushOnRestart: true,
  },
  initialData: {
    numberOfSpecimens:
      readBoolKey('LOAD_INITIAL_DATA') &&
      readKey('INITIAL_DATA_NUMBER_OF_SPECIMENS'),
  },
  jobs: {
    ...baseConfig.jobs,
    schedulerActive: true,
    schedulerIndexElastic: true,
    workerActive: false,
  },
}
