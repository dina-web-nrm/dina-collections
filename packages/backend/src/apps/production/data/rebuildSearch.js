const bootstrapData = require('../../../lib/bootstrap/bootstrapData')
const serviceDefinitions = require('../../../services')
const serviceOrder = require('../../../services/serviceOrder')

bootstrapData({
  env: 'development',
  importData: false,
  serviceDefinitions,
  serviceOrder,
})
