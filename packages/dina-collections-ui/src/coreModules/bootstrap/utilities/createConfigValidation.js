import { createSystemSchemaValidator } from 'utilities/error'

export const addModuleToValidations = (validations, module) => {
  const moduleSchemas = module.schemas
  const moduleConfigSchema = moduleSchemas && moduleSchemas.config
  if (!moduleConfigSchema) {
    return validations
  }

  const moduleName = module.name

  return {
    ...validations,
    [moduleName]: moduleConfigSchema,
  }
}

export const extractConfigSchemas = modules => {
  return modules.reduce(addModuleToValidations, {})
}

export const addModuleToEndpoints = (endpoints, module) => {
  const moduleEndpoints = module.endpoints
  if (!endpoints) {
    return moduleEndpoints
  }

  return {
    ...endpoints,
    ...moduleEndpoints,
  }
}

export const validateConfigWithSchema = (config, configSchemas = {}) => {
  Object.keys(configSchemas).forEach(moduleName => {
    const moduleSchema = configSchemas[moduleName]
    const moduleConfig = config[moduleName]
    const validate = createSystemSchemaValidator(moduleSchema)
    const errors = validate(moduleConfig)
    if (errors) {
      const errorMessage = `Validating config for module: ${
        moduleName
      }: ${JSON.stringify(errors, null, 2)}`
      throw new Error(errorMessage)
    }
  })
}
export default function createConfigValidation(modules) {
  const configSchemas = extractConfigSchemas(modules)
  return (config = {}) => {
    validateConfigWithSchema(config, configSchemas)
  }
}
