/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs')
const path = require('path')

const buildEndpoint = require('../utilities/buildEndpoint')

module.exports = function readEndpoints(apisBasePath) {
  const apiEndpoints = fs
    .readdirSync(apisBasePath)
    .filter(apiName => {
      const apiPath = path.join(apisBasePath, apiName)
      return fs.statSync(apiPath).isDirectory()
    })
    .reduce((obj, apiName) => {
      const endpointPath = path.join(apisBasePath, apiName, 'endpoints')
      return {
        ...obj,
        [apiName]: require(endpointPath),
      }
    }, {})
  return Object.keys(apiEndpoints).reduce((endpoints, key) => {
    const localEndpoints = Object.keys(apiEndpoints[key]).reduce(
      (obj, operationId) => {
        const rawEndpoint = apiEndpoints[key][operationId]
        const endpoint = buildEndpoint({
          operationId,
          ...rawEndpoint,
        })
        const tags = endpoint.tags ? [...endpoint.tags, key] : [key]

        return {
          ...obj,
          [operationId]: {
            ...endpoint,
            tags,
          },
        }
      },
      {}
    )

    return {
      ...endpoints,
      ...localEndpoints,
    }
  }, {})
}
