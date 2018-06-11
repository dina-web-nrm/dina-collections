const baseConfig = require('../config')

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ...baseConfig,
  api: {
    active: false,
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
