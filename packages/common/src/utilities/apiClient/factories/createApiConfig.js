const apiConfigSchema = require('../schemas/apiConfigSchema')

module.exports = function createApiConfig(apiConfigInput = {}) {
  const apiConfig = {
    validateInput: true,
    validateOutput: true,
    ...apiConfigInput,
  }

  const { systemValidate } = apiConfig

  const error = systemValidate && systemValidate(apiConfig, apiConfigSchema)
  if (error) {
    throw error
  }
  return apiConfig
}
