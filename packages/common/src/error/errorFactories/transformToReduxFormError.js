const objectPath = require('object-path')

const createReduxFormParameterError = transformedAjvError => {
  const { fullPath, errorCode, params } = transformedAjvError
  return {
    errorCode,
    fullPath,
    params: {
      fullPath,
      ...params,
    },
  }
}

// Errors not related to a specific field
const isGeneralSchemaError = transformedAjvError => {
  if (transformedAjvError.errorCode === 'ADDITIONAL_PROPERTIES') {
    return true
  }
  return !transformedAjvError.fullPath
}

module.exports = function transformToReduxFormError({ parameterErrors }) {
  return parameterErrors.reduce(
    (reduxFormError, transformedAjvError) => {
      const reduxFormParameterError = createReduxFormParameterError(
        transformedAjvError
      )

      if (isGeneralSchemaError(transformedAjvError)) {
        objectPath.set(reduxFormError, 'schemaErrors', [
          ...reduxFormError.schemaErrors,
          reduxFormParameterError,
        ])

        return reduxFormError
      }

      const { fullPath } = transformedAjvError
      objectPath.set(reduxFormError, fullPath, reduxFormParameterError)
      return reduxFormError
    },
    {
      schemaErrors: [],
    }
  )
}
