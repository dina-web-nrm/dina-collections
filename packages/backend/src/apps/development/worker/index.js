const bootstrapWorker = require('../../../lib/bootstrap/bootstrapWorker')
const serviceDefinitions = require('../../../services')
const serviceOrder = require('../../../services/serviceOrder')

bootstrapWorker({
  env: 'development',
  serviceDefinitions,
  serviceOrder,
})
