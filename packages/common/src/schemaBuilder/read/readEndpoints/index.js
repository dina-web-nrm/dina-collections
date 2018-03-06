const buildEndpoint = require('../utilities/buildEndpoint')

module.exports = function readEndpoints(services) {
  const endpoints = {}
  Object.keys(services).forEach(serviceName => {
    const service = services[serviceName]
    const resources = service.resources || {}
    Object.keys(resources).forEach(resourceName => {
      const resource = resources[resourceName]
      const operations = resource.operations || {}
      Object.keys(operations).forEach(operationId => {
        const operation = operations[operationId]

        const endpoint = buildEndpoint({
          operationId,
          ...operation,
        })

        const tags = endpoint.tags
          ? [...endpoint.tags, serviceName]
          : [serviceName]

        endpoints[operationId] = {
          ...endpoint,
          tags,
        }
      })
    })
  })

  return endpoints
}
