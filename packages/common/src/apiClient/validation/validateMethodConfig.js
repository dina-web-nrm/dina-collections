const methodConfigSchema = require('../schemas/methodConfigSchema')

module.exports = function validateMethodConfig(
  methodConfigInput,
  apiConfigInput
) {
  const { systemValidate } = apiConfigInput

  const error =
    systemValidate && systemValidate(methodConfigInput, methodConfigSchema)
  if (error) {
    throw error
  }
}
