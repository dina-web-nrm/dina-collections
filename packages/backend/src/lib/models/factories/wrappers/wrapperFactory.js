const createSystemBackendValidator = require('common/src/error/validators/createSystemBackendValidator')

const createInputSchemaValidationFunction = ({ methodName, schema }) => {
  return createSystemBackendValidator({
    detail: `Error in method: ${methodName}`,
    schema,
    throwError: true,
    type: 'modelWrapperInput',
  })
}

const createOutputSchemaValidationFunction = ({ methodName, schema }) => {
  return createSystemBackendValidator({
    detail: `Error in method: ${methodName}`,
    schema,
    throwError: true,
    type: 'modelWrapperOutput',
  })
}

module.exports = function wrapperFactory(
  { methodName, inputSchema, outputSchema, validateInput, validateOutput } = {}
) {
  const inputSchemaValidationFunction = inputSchema
    ? createInputSchemaValidationFunction({ methodName, schema: inputSchema })
    : null
  const outputSchemaValidationFunction = outputSchema
    ? createOutputSchemaValidationFunction({ methodName, schema: outputSchema })
    : null

  return function buildWrapper(methodFunction) {
    return function wrapper(input = {}) {
      return Promise.resolve().then(() => {
        if (validateInput) {
          validateInput(input)
        }

        if (inputSchemaValidationFunction) {
          inputSchemaValidationFunction(input)
        }

        return Promise.resolve()
          .then(() => {
            return methodFunction(input)
          })
          .then(output => {
            if (outputSchemaValidationFunction) {
              outputSchemaValidationFunction(output)
            }

            if (validateOutput) {
              validateOutput(output)
            }
            return output
          })
      })
    }
  }
}
