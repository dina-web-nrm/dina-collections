const decorateAdditionalProperties = require('./decorateAdditionalProperties')
const transform = require('./transform')

module.exports = function apiErrorMapper(ajvErrors) {
  if (!ajvErrors) {
    return ajvErrors
  }
  return ajvErrors.map(decorateAdditionalProperties).map(transform)
}
