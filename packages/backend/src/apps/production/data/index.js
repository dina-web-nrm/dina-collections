const bootstrap = require('../../../lib/bootstrap')
const config = require('./config')
const serviceDefinitions = require('../../../services')
const serviceOrder = require('../../../services/serviceOrder')

bootstrap({
  config,
  serviceDefinitions,
  serviceOrder,
})
