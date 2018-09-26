const errorCodeMap = require('../../../../error/constants/errorCodes')
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

const createError = (status, errorCodes) => {
  errorCodes.forEach(code => {
    if (!errorCodeMap[code]) {
      throw new Error(`Unknown errorCode for code ${code}`)
    }
  })

  if (!errorStatus[status]) {
    throw new Error(`Unknown errorStatus for status: ${status}`)
  }
  const { title } = errorStatus[status]

  return {
    allOf: [
      {
        $ref: '#/components/schemas/BaseError',
      },
      {
        properties: {
          code: {
            oneOf: errorCodes.map(errorCode => {
              return { $ref: `#/components/schemas/${errorCode}` }
            }),
          },
          status: { $ref: `#/components/schemas/${status}` },
        },
        type: 'object',
      },
    ],
    title,
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

const buildErrorCodeModel = errorCode => {
  const { description } = errorCodeMap[errorCode]
  return {
    description,
    example: errorCode,
    title: errorCode,
    type: 'string',
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
      const errorCodes = endpoint.errors[status]
      errorCodes.forEach(errorCode => {
        if (!errorModels[errorCode]) {
          errorModels[errorCode] = buildErrorCodeModel(errorCode)
        }
      })

      const key = `${endpoint.operationId}-${status}`
      const error = createError(status, errorCodes)
      errorModels[key] = error
    })
    return errorModels
  })

  return errorModels
}
