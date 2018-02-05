const walkEndpoints = require('./walkEndpoints')

module.exports = function readEndpoints(endpointsBasePath) {
  const directory = endpointsBasePath
  return walkEndpoints({
    directory,
  })
}
