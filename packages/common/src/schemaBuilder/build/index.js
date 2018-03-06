const createOpenApi = require('./openApi')
const createModels = require('./models')

module.exports = function build({
  apis,
  endpoints,
  errors,
  info,
  models,
  normalize,
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
    normalize,
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
    normalize,
    parameters,
    security,
  })

  return {
    cleanModels,
    openApi,
  }
}
