const buildPath = require('./buildPath')

module.exports = function creteSwaggerPaths(endpoints) {
  return Object.keys(endpoints).reduce((paths, endpointName) => {
    const endpoint = endpoints[endpointName]
    let updatedPaths = { ...paths }
    if (!updatedPaths[endpoint.path]) {
      updatedPaths = {
        ...updatedPaths,
        [endpoint.path]: {},
      }
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
