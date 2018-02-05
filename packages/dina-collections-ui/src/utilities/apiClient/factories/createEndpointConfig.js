const endpointConfigSchema = require('../schemas/endpointConfigSchema')

module.exports = function createEndpointConfig(
  endpointConfigInput,
  apiConfigInput
) {
  const { systemValidate } = apiConfigInput
  const error =
    systemValidate && systemValidate(endpointConfigInput, endpointConfigSchema)
  if (error) {
    throw error
  }
  return endpointConfigInput
}
