import objectPath from 'object-path'
import { SubmissionError } from 'redux-form'

export default function handleReduxFormSubmitError(error) {
  const errorMessage = `Status: ${error.status}, message: ${
    error.error ? error.error.message : error.message
  }`

  const options = {
    _error: errorMessage,
    requestError: error,
  }

  if (error.parameterErrors) {
    error.parameterErrors.forEach(parameterError => {
      if (parameterError.fullPath && parameterError.errorCode) {
        objectPath.set(options, parameterError.fullPath, parameterError)
      }
    })
  }

  throw new SubmissionError(options)
}
