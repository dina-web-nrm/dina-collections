/* eslint-disable sort-keys */
const createOpenApiInfo = require('./createOpenApiInfo')
const createOpenApiServers = require('./createOpenApiServers')
const createOpenApiSecurity = require('./createOpenApiSecurity')
const createOpenApiTags = require('./createOpenApiTags')
const createOpenApiPaths = require('./createOpenApiPaths')
const createOpenApiComponents = require('./createOpenApiComponents')

module.exports = function createOpenApi({
  apis,
  endpoints,
  errors,
  info,
  models,
  parameters,
  security,
  servers,
}) {
  return {
    openapi: '3.0.0',
    info: createOpenApiInfo(info),
    servers: createOpenApiServers(servers),
    security: createOpenApiSecurity(security),
    tags: createOpenApiTags({ apis }),
    paths: createOpenApiPaths(endpoints),
    components: createOpenApiComponents({
      endpoints,
      models,
      parameters,
      errors,
    }),
  }
}
