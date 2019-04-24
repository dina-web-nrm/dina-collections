const { bootstrapData } = require('../../lib/bootstrap')
const serviceConfigurations = require('../../serviceConfigurations')

bootstrapData({
  importData: false,
  serviceConfigurations,
})
