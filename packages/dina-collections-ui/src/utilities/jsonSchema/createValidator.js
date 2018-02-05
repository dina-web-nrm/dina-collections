const objectPath = require('object-path')
const Ajv = require('ajv')
const models = require('dina-schema/build/models.json')

const defaultOptions = {
  allErrors: true,
  // errorDataPath: 'property',
  jsonPointers: true, // -> /members/0
  useDefaults: true, // e.g.to may have default empty array
  verbose: false, // to have information about the error.parentSchema
}

const createAjv = options => {
  const ajv = new Ajv(options)

  Object.keys(models).forEach(key => {
    ajv.addSchema(models[key], key)
  })

  return ajv
}

const defaultAjv = createAjv(defaultOptions)

// TODO: rename model to modelName
module.exports = function createModelSchemaValidator({
  dataPath,
  schema: customSchema,
  model,
  errorHandler,
  throwOnError,
  options,
}) {
  const ajv = options ? createAjv(options) : defaultAjv

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
    const objToTest = dataPath && obj ? objectPath.get(obj, dataPath) : obj
    const validate = ajv.compile(schema)

    const valid = validate(objToTest)
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
