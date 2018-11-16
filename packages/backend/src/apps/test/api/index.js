const bootstrapApi = require('../../../lib/bootstrap/bootstrapApi')
const serviceDefinitions = require('../../../services')
const serviceOrder = require('../../../services/serviceOrder')

bootstrapApi({
  env: 'test',
  schedulerActive: false,
  serviceDefinitions,
  serviceOrder,
  workerActive: false,
})
