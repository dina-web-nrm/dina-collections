const { readBoolKey } = require('../../../lib/config/env')
const baseConfig = require('../../baseConfig')

const disableAuth = readBoolKey('DISABLE_AUTH')
module.exports = {
  ...baseConfig,
  api: {
    ...baseConfig.api,
    active: true,
  },
  auth: {
    ...baseConfig.auth,
    active: !disableAuth,
  },

  jobs: {
    ...baseConfig.jobs,
    schedulerActive: false,
    workerActive: true,
  },
}
