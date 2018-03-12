module.exports = function buildRelationships({
  format: relationFormat = 'object',
  key,
  link,
  resource: resourceInput,
}) {
  const resource = resourceInput || key
  const existingResourceData = {
    additionalProperties: false,
    properties: {
      id: {
        example: '1234',
        type: 'string',
      },
      type: {
        enum: [resource],
        example: resource,
        type: 'string',
      },
    },
    type: 'object',
  }

  const links = !link
    ? undefined
    : {
        properties: {
          self: {
            example: `https://domain${link}`,
            type: 'string',
            'x-faker': 'internet.url',
          },
        },
        type: 'object',
      }

  if (relationFormat === 'object') {
    return {
      oneOf: [
        {
          additionalProperties: false,
          properties: {
            data: existingResourceData,
            links,
          },
          type: 'object',
        },
        {
          additionalProperties: false,
          properties: {
            data: {
              type: 'null',
            },
            links,
          },
          type: 'object',
        },
      ],
      type: 'object',
    }
  }
  return {
    additionalProperties: false,
    properties: {
      data: {
        items: existingResourceData,
        type: 'array',
      },
      links,
    },
    type: 'object',
  }
}
