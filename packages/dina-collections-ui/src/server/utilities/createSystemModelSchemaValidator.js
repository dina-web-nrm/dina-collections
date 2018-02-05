const Ajv = require('ajv')
const models = require('dina-schema/build/models.json')

const options = {
  allErrors: true,
  jsonPointers: true, // -> /members/0
  useDefaults: true, // e.g.to may have default empty array
  verbose: true, // to have information about the error.parentSchema
}

const ajv = new Ajv(options)

Object.keys(models).forEach(key => {
  ajv.addSchema(models[key], key)
})

// TODO: rename model to modelName
function createBaseModelSchemaValidator({
  schema: customSchema,
  model,
  errorHandler,
  throwOnError,
}) {
  if (model && !models[model]) {
    throw new Error(`Unknown model: ${model}`)
  }

  if (!models[model] && !customSchema) {
    throw new Error(
      'If model not provided have to provide customSchema (key schema)'
    )
  }

  const schema = models[model] || customSchema
  return obj => {
    const validate = ajv.compile(schema)
    const valid = validate(obj)
    if (valid) {
      return null
    }

    const error = errorHandler ? errorHandler(validate.errors) : validate.errors

    if (throwOnError) {
      throw error
    }

    return error
  }
}

const tmpErrorHandler = errors => {
  return {
    errors,
    status: 400,
  }
}

module.exports = function createSystemModelSchemaValidator({
  model,
  schema,
  throwOnError,
}) {
  return createBaseModelSchemaValidator({
    errorHandler: tmpErrorHandler,
    model,
    schema,
    throwOnError,
  })
}
