const baseConfig = require('../config')

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ...baseConfig,
  db: {
    ...baseConfig.db,
    flushOnRestart:
      (baseConfig.env.isDevelopment && baseConfig.db.flushOnRestart) || false,
    loadInitialData:
      (baseConfig.env.isDevelopment && baseConfig.db.loadInitialData) || false,
  },
  jobs: {
    schedulerActive: true,
    workerActive: true,
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
