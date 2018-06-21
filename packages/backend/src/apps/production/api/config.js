const baseConfig = require('../../baseConfig')

module.exports = {
  ...baseConfig,
  api: {
    ...baseConfig.api,
    active: true,
  },
}
