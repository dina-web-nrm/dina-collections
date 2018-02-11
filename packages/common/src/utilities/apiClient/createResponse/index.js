const validateOutput = require('./validateOutput')
const mapOutput = require('./mapOutput')

module.exports = function createResponse({
  apiConfig,
  endpointConfig,
  methodConfig,
  responseData,
}) {
  return validateOutput({
    apiConfig,
    endpointConfig,
    methodConfig,
    responseData,
  }).then(() => {
    return mapOutput({
      apiConfig,
      endpointConfig,
      methodConfig,
      responseData,
    })
  })
}
