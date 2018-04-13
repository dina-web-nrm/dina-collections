const buildEndpoints = require('./buildEndpoints')
const createOpenApi = require('./openApi')
const createModels = require('./models')

module.exports = function build({
  apis,
  endpoints: endpointsInput,
  errors,
  info,
  models,
  normalize,
  parameters,
  security,
  servers,
  version,
}) {
  const endpoints = buildEndpoints(endpointsInput)

  const openApi = createOpenApi({
    apis,
    endpoints,
    errors,
    info,
    models,
    normalize,
    parameters,
    security,
    servers,
    version,
  })

  const cleanModels = createModels({
    apis,
    endpoints,
    errors,
    info,
    models,
    normalize,
    parameters,
    security,
    version,
  })

  return {
    cleanModels,
    openApi,
  }
}
