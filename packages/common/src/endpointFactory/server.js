const createBackendApiClientValidator = require('../error/validators/createBackendApiClientValidator')
const createEndpointFactory = require('./createEndpointFactory')
const importFaker = require('../jsonSchema/importJsonFakerSync')

module.exports = createEndpointFactory({
  createApiClientValidator: createBackendApiClientValidator,
  importFaker,
  origin: 'server',
})
