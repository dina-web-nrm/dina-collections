const objectPath = require('object-path')
const { ERROR_CODES, ORIGINS, TYPES } = require('../constants')
const createError = require('./base')

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

const transformToReduxFormError = transformedAjvErrors => {
  return transformedAjvErrors.reduce(
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

module.exports = function createFormError(error) {
  const context = {
    errorCode: ERROR_CODES.FORM_VALIDATION_ERROR,
    origin: ORIGINS.CLIENT,
    statusCode: null,
    type: TYPES.FORM,
  }
  const formError = createError({
    context,
    error,
  })
  return transformToReduxFormError(formError.error)
}
