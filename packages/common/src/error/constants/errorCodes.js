const errorCodes = {
  CONFIG_ERROR: {
    description: 'Something is wrong with configuration. See details',
    title: 'Config error',
  },
  FORBIDDEN_ERROR: {
    description: 'See details',
    title: 'Forbidden error',
  },
  INTERNAL_SERVER_ERROR: {
    description: 'Error occurred on server',
    title: 'Internal server error',
  },
  INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE: {
    description:
      'Error occurred on server. Tried to throw an error with an invalid error code',
    title: 'Internal server error',
  },
  INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE: {
    description:
      'Error occurred on server. Tried to throw an error with an invalid status code',
    title: 'Internal server error',
  },
  MODEL_WRAPPER_INPUT_ERROR: {
    description: 'Something went wrong in the model layer. See details',
    title: 'Model error',
  },
  MODEL_WRAPPER_OUTPUT_ERROR: {
    description: 'Something went wrong in the model layer. See details',
    title: 'Model error',
  },
  NOT_FOUND_ERROR: {
    description: 'See details',
    title: 'Not found error',
  },
  REQUEST_BODY_VALIDATION_ERROR: {
    description: 'Input body does not pass validations',
    title: 'Request body validation error',
  },
  REQUEST_ERROR: {
    description: 'Something is wrong with the request. See details',
    title: 'Request error',
  },
  REQUEST_QUERY_VALIDATION_ERROR: {
    description: 'Query params does not pass validations',
    title: 'Query validation error',
  },
  RESOURCE_NOT_FOUND_ERROR: {
    description: 'Requested resource not found. See details',
    title: 'Not found error',
  },
  RESPONSE_VALIDATION_ERROR: {
    description: 'Output does not pass validations',
    title: 'Response validation error',
  },
}

module.exports = Object.keys(errorCodes).reduce((obj, key) => {
  return {
    ...obj,
    [key]: {
      ...errorCodes[key],
      code: key,
    },
  }
}, {})
