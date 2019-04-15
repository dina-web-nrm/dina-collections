const createFrontendApiClientValidator = require('common/src/error/validators/createFrontendApiClientValidator')
const createEndpointFactory = require('common/src/endpointFactory/createEndpointFactory')

const importFaker = () => import('json-schema-faker')

module.exports = createEndpointFactory({
  createApiClientValidator: createFrontendApiClientValidator,
  importFaker,
})
