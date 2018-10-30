const bootstrapApi = require('../../../lib/bootstrap/bootstrapApi')
const serviceDefinitions = require('../../../services')
const serviceOrder = require('../../../services/serviceOrder')

bootstrapApi({
  env: 'development',
  schedulerActive: false,
  serviceDefinitions,
  serviceOrder,
  workerActive: true,
})
