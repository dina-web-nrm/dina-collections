const baseConfig = require('../../baseConfig')
const { readKey, readBoolKey } = require('../../../lib/config/env')

module.exports = {
  ...baseConfig,
  db: {
    ...baseConfig.db,
    flushOnRestart: true,
    importData: readBoolKey('IMPORT_DATA'),
  },
  elasticsearch: {
    ...baseConfig.elasticsearch,
    flushOnRestart: true,
  },
  initialData: {
    numberOfSpecimens:
      readBoolKey('IMPORT_DATA') && readKey('IMPORT_DATA_NUMBER_OF_SPECIMENS'),
  },
  jobs: {
    ...baseConfig.jobs,
    schedulerActive: true,
    schedulerIndexElastic: true,
    workerActive: false,
  },
}
