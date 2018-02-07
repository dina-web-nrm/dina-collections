/* eslint-disable sort-keys */
const createSwaggerInfo = require('./createSwaggerInfo')
const createSwaggerTags = require('./createSwaggerTags')
const createSwaggerPaths = require('./createSwaggerPaths')
const createSwaggerDefinitions = require('./createSwaggerDefinitions')

module.exports = function createSwagger({
  endpoints,
  // errors,
  info,
  models,
  // parameters,
  apis,
  // security,
}) {
  const definitions = createSwaggerDefinitions({
    endpoints,
    models,
  })

  return {
    swagger: '2.0',
    host: 'alpha-api-docs.dina-web.net',
    basePath: '/',
    schemes: ['http'],

    info: createSwaggerInfo(info),
    tags: createSwaggerTags({ apis }),
    definitions,
    // servers: createSwaggerServers(apis),
    // security: createSwaggerSecurity(security),
    paths: createSwaggerPaths(endpoints),
  }
}
