const baseConfig = require('../config')

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ...baseConfig,
  api: {
    active: false,
  },
  searchIndexBuilder: {
    active: true,
  },
  services: {
    agentService: true,
    authService: true,
    curatedEventService: true,
    curatedListService: true,
    placeService: true,
    searchService: true,
    specimenService: true,
    statusService: true,
    storageService: true,
    taxonomyService: true,
  },
}
