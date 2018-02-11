/* eslint-disable import/no-dynamic-require, global-require */
const buildEndpoint = require('../utilities/buildEndpoint')

module.exports = function readEndpoint({ endpointPath, serverName }) {
  const rawEndpoint = require(endpointPath)
  const endpoint = buildEndpoint(rawEndpoint)

  const tags = endpoint.tags ? [...endpoint.tags, serverName] : [serverName]
  return {
    ...endpoint,
    tags,
  }
}
