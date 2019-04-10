const bootstrapData = require('../../lib/bootstrap/bootstrapData')
const serviceConfigurations = require('../../serviceConfigurations')

bootstrapData({
  importData: false,
  serviceConfigurations,
})
