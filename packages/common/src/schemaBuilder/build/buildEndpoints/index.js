const buildEndpoint = require('./buildEndpoint')

module.exports = function buildEndpoints(endpointSpecification) {
  return Object.keys(endpointSpecification).reduce((obj, operationId) => {
    return {
      ...obj,
      [operationId]: buildEndpoint(endpointSpecification[operationId]),
    }
  }, {})
}
