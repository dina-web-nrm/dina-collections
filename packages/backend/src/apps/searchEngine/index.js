const serviceDefinitions = require('../../services')
const bootstrap = require('../../lib/bootstrap')
const config = require('./config')

bootstrap({
  config,
  serviceDefinitions,
})
