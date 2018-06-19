const baseConfig = require('../config')

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ...baseConfig,
  db: {
    ...baseConfig.db,
    flushOnRestart: false,
    loadInitialData: false,
  },
  elasticsearch: {
    ...baseConfig.elasticsearch,
    flushOnRestart: false,
  },
  jobs: {
    schedulerActive: false, // baseConfig.env.isDevelopment,
    workerActive: false, // baseConfig.env.isDevelopment,
  },
  services: {
    agentService: true,
    authService: true,
    curatedEventService: true,
    curatedListService: true,
    jobService: true,
    placeService: true,
    searchService: true,
    specimenService: true,
    statusService: true,
    storageService: true,
    taxonomyService: true,
  },
}
