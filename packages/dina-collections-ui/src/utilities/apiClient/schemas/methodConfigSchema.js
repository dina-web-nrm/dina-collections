const methodConfigSchema = {
  additionalProperties: false,
  properties: {
    mapHeaders: {
      not: {
        type: 'string',
      },
    },
    method: {
      type: 'string',
    },
    requestContentType: {
      type: 'string',
    },
    responseContentType: {
      type: 'string',
    },
  },
  required: ['method', 'requestContentType', 'responseContentType'],
}

export default methodConfigSchema
