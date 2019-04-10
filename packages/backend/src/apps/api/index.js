const bootstrapApi = require('../../lib/bootstrap/bootstrapApi')
const serviceConfigurations = require('../../services')
const serviceOrder = require('../../services/serviceOrder')

bootstrapApi({
  serviceConfigurations,
  serviceOrder,
})
