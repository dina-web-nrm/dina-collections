/* eslint-disable import/no-dynamic-require, global-require */

module.exports = function readServers(serverInfoPath) {
  const servers = require(serverInfoPath)
  return Object.keys(servers).reduce((obj, key) => {
    const server = servers[key]
    return {
      ...obj,
      [key]: server,
    }
  }, {})
}
