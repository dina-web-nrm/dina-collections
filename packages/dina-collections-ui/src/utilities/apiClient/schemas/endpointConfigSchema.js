const endpointConfigSchema = {
  additionalProperties: false,
  properties: {
    baseUrl: {
      type: 'string',
    },
    mapBody: {
      not: {
        type: 'string',
      },
    },
    mapHeaders: {
      not: {
        type: 'string',
      },
    },
    mapResponse: {
      not: {
        type: 'string',
      },
    },
    methodName: {
      type: 'string',
    },
    mock: {
      not: {
        type: 'string',
      },
    },
    operationId: {
      type: 'string',
    },
    pathname: {
      type: 'string',
    },
    validateBody: {
      not: {
        type: 'string',
      },
    },
    validateResponse: {
      not: {
        type: 'string',
      },
    },
  },
  required: [],
}

export default endpointConfigSchema
