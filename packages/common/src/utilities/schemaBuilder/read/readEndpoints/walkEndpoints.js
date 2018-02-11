const fs = require('fs')
const path = require('path')
const readEndpoint = require('./readEndpoint')

module.exports = function walkEndpoints({ directory }) {
  const serverNames = fs.readdirSync(directory)
  const endpoints = {}
  const pathMethodNames = {}
  serverNames.forEach(serverName => {
    const serverPath = path.join(directory, serverName)
    if (fs.statSync(path.join(serverPath)).isDirectory()) {
      const endpointsPath = path.join(serverPath, 'endpoints')
      const endpointDirectories = fs.readdirSync(endpointsPath)
      endpointDirectories.forEach(endpointName => {
        const endpointPath = path.join(endpointsPath, endpointName)

        if (fs.statSync(path.join(endpointPath)).isDirectory()) {
          if (endpoints[endpointName]) {
            throw new Error(
              `Endpoint with name: ${endpointName} already registered`
            )
          }

          const endpoint = readEndpoint({
            endpointName,
            endpointPath,
            serverName,
          })
          const pathMethodName = `${endpoint.method}-${endpoint.path}`
          if (pathMethodNames[pathMethodName]) {
            throw new Error(
              `Path for ${endpointName} already registered: ${pathMethodName}`
            )
          }
          pathMethodNames[pathMethodName] = true

          endpoints[endpointName] = endpoint
        }
      })
    }
  })

  return endpoints
}
