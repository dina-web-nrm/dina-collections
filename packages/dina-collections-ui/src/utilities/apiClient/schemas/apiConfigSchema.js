const apiConfigSchema = {
  additionalProperties: false,
  properties: {
    baseUrl: {
      type: 'string',
    },
    cache: {
      type: 'object',
    },
    debug: {
      type: 'boolean',
    },
    enableEndpointMocks: {
      type: 'boolean',
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
    mock: {
      type: 'object',
    },
    systemValidate: {
      not: {
        type: 'string',
      },
    },
    throwOnValidationErrors: {
      type: 'boolean',
    },
    validateInput: {
      type: 'boolean',
    },
    validateOutput: {
      type: 'boolean',
    },
    validateResponse: {
      not: {
        type: 'string',
      },
    },
  },
  required: ['validateInput', 'validateOutput'],
}

export default apiConfigSchema
