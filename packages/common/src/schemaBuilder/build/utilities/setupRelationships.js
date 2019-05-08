/* eslint-disable sort-keys */

module.exports = function setupRelationships({ model: modelInput, format }) {
  const model = JSON.parse(JSON.stringify(modelInput))
  const xRelationships =
    model && model.properties && model.properties['x-relationships']

  if (!xRelationships) {
    return model
  }

  delete model.properties['x-relationships']

  // return model
  if (format === 'jsonApi' && !model.properties.relationships) {
    model.properties.relationships = {
      properties: {},
      type: 'object',
    }
  }

  Object.keys(xRelationships).forEach(key => {
    const { type, 'x-path': xPath, resource, ...rest } = xRelationships[key]

    if (format === 'jsonApi') {
      if (type === 'array') {
        model.properties.relationships.properties[key] = {
          additionalProperties: false,
          type: 'object',
          ...rest,
          'x-path': xPath,
          properties: {
            data: {
              items: {
                $ref: resource,
                additionalProperties: false,
                properties: {
                  id: {
                    example: '1234',
                    type: 'string',
                  },
                  type: {
                    // enum: [resource],
                    type: 'string',
                  },
                },
                type: 'object',
              },
              type: 'array',
            },
          },
        }
      } else {
        model.properties.relationships.properties[key] = {
          type: 'object',
          ...rest,
          'x-path': xPath,
          properties: {
            data: {
              $ref: resource,
              properties: {
                id: {
                  type: 'string',
                },
                type: {
                  // enum: [resource],
                  type: 'string',
                },
              },
              // required: ['id', 'type'],
              type: 'object',
            },
          },
        }
      }
    }

    if (format === 'nested') {
      if (!xPath) {
        if (type === 'array') {
          model.properties[key] = {
            items: {
              $ref: `__ROOT__${resource}`,
            },
            type: 'array',
          }
        } else {
          model.properties[key] = {
            $ref: `__ROOT__${resource}`,
          }
        }
      }
    }
  })
  return model
}
