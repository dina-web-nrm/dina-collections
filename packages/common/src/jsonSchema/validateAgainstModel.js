const createValidator = require('./createValidator')

const defaultOptions = {
  throwOnError: false,
}

module.exports = function validateAgainstModel(
  model,
  object,
  options = defaultOptions
) {
  const validator = createValidator({
    model,
    options: {
      allErrors: true,
      // errorDataPath: 'property',
      jsonPointers: true, // -> /members/0
      useDefaults: true, // e.g.to may have default empty array
      verbose: false, // to have information about the error.parentSchema
    },
    throwOnError: options.throwOnError,
  })
  return validator(object)
}
