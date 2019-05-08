const errorStatus = require('../../../../error/constants/errorStatus')
const parameterErrorCodesMap = require('../../../../error/constants/parameterErrorCodes')

const parameterErrorCodes = Object.values(parameterErrorCodesMap)

const createBaseError = () => {
  return {
    properties: {
      description: {
        description: 'Description of the returned code',
        type: 'string',
      },
      detail: {
        description:
          'A human-readable explanation specific to this occurrence of the problem.',
        type: 'string',
      },
      id: {
        description:
          'A unique identifier for this particular occurrence of the problem.',
        type: 'string',
      },
      message: { type: 'string' },
      parameterErrors: {
        properties: {
          errorCode: {
            enum: parameterErrorCodes,
            type: 'string',
          },
        },
        type: 'object',
      },
      title: {
        description:
          'A short, human-readable summary of the problem. Associated with the code',
        type: 'string',
      },
    },
    required: ['status', 'code'],
    title: 'Base error',
    type: 'object',
  }
}

const buildStatusModel = status => {
  const { title } = errorStatus[status]
  return {
    description: title,
    example: status,
    title: status,
    type: 'integer',
  }
}

module.exports = function extractErrorsFromEndpoints({ endpoints }) {
  const errorModels = {
    BaseError: createBaseError(),
  }

  Object.keys(endpoints).forEach(endpointName => {
    const endpoint = endpoints[endpointName]
    if (!endpoint.errors) {
      return errorModels
    }

    Object.keys(endpoint.errors).forEach(status => {
      if (!errorModels[status]) {
        errorModels[status] = buildStatusModel(status)
      }
    })
    return errorModels
  })

  return errorModels
}
