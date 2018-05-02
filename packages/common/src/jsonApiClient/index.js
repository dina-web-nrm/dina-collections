const createOpenApiClient = require('../openApiClient')

module.exports = function createJsonApiClient({
  apiConfigInput,
  createEndpoint,
}) {
  return createOpenApiClient({
    apiConfigInput,
    createEndpoint,
  })
}
