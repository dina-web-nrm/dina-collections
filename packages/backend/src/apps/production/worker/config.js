const baseConfig = require('../../baseConfig')

module.exports = {
  ...baseConfig,
  api: {
    active: false,
  },
  jobs: {
    ...baseConfig.jobs,
    schedulerActive: true,
    workerActive: true,
  },
}
