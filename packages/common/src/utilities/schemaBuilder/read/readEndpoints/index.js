/* eslint-disable import/no-dynamic-require, global-require */
const buildEndpoint = require('../utilities/buildEndpoint')

module.exports = function readEndpoints(endpointsBasePath) {
  const apis = require(endpointsBasePath)
  return Object.keys(apis).reduce((endpoints, key) => {
    const api = apis[key]

    const localEndpoints = Object.keys(api.endpoints).reduce(
      (obj, operationId) => {
        const rawEndpoint = api.endpoints[operationId]
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
