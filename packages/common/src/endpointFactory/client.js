const createFrontendApiClientValidator = require('../error/validators/createFrontendApiClientValidator')
const createEndpointFactory = require('./createEndpointFactory')

const importFaker = () => import('json-schema-faker')

module.exports = createEndpointFactory({
  createApiClientValidator: createFrontendApiClientValidator,
  importFaker,
  origin: 'client',
})
