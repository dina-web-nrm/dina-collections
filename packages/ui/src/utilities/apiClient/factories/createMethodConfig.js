const methodConfigSchema = require('../schemas/methodConfigSchema')

module.exports = function createMethodConfig(
  methodConfigInput,
  apiConfigInput
) {
  const methodConfig = {
    requestContentType: 'json',
    responseContentType: 'json',
    ...methodConfigInput,
  }

  const { systemValidate } = apiConfigInput

  const error =
    systemValidate && systemValidate(methodConfig, methodConfigSchema)
  if (error) {
    throw error
  }
  return methodConfig
}
