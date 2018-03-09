const errorCodes = {
  CONFIG_ERROR: {
    description: 'Something is wrong with configuration. See details',
    title: 'Config error',
  },
  INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE: {
    description:
      'Error occured on server. Tried to throw an error with an invalid error code',
    title: 'Internal server error',
  },
  INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE: {
    description:
      'Error occured on server. Tried to throw an error with an invalid status code',
    title: 'Internal server error',
  },
  NOT_FOUND_ERROR: {
    description: 'See details',
    title: 'Not found error',
  },
  REQUEST_BODY_VALIDATION_ERROR: {
    description: 'Input body dont pass validations',
    title: 'Request body validation error',
  },
  REQUEST_ERROR: {
    description: 'Something is wrong with the request. See details',
    title: 'Request error',
  },
  RESOURCE_NOT_FOUND_ERROR: {
    description: 'Requested resource not found. See details',
    title: 'Not found error',
  },
  RESPONSE_VALIDATION_ERROR: {
    description: 'Output dont pass validations',
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
