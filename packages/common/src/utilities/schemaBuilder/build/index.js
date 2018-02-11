const createOpenApi = require('./openApi')
const createModels = require('./models')
const createSwagger = require('./swagger')

module.exports = function build({
  apis,
  endpoints,
  errors,
  info,
  models,
  parameters,
  security,
  servers,
}) {
  const openApi = createOpenApi({
    apis,
    endpoints,
    errors,
    info,
    models,
    parameters,
    security,
    servers,
  })

  const swagger = createSwagger({
    apis,
    endpoints,
    errors,
    info,
    models,
    parameters,
    security,
    servers,
  })

  const cleanModels = createModels({
    apis,
    endpoints,
    errors,
    info,
    models,
    parameters,
    security,
  })

  return {
    cleanModels,
    openApi,
    swagger,
  }
}
