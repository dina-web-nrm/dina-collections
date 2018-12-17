const buildPath = require('./buildPath')

module.exports = function createOpenApiPaths(endpoints) {
  return Object.keys(endpoints).reduce((paths, endpointName) => {
    const endpoint = endpoints[endpointName]
    let updatedPaths = { ...paths }
    if (!updatedPaths[endpoint.path]) {
      updatedPaths = {
        ...updatedPaths,
        [endpoint.path]: {},
      }
    }
    if (updatedPaths[endpoint.path][endpoint.method]) {
      throw new Error(
        `Detected duplicated method: ${endpoint.method} for path: ${
          endpoint.path
        }`
      )
    }
    const path = buildPath(endpoint)
    return {
      ...updatedPaths,
      [endpoint.path]: {
        ...updatedPaths[endpoint.path],
        [endpoint.method]: path,
      },
    }
  }, {})
}
