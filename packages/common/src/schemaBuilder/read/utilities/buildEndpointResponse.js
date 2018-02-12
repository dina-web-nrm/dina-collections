/* eslint-disable sort-keys */

const buildLinks = ({ selfLink } = {}) => {
  if (!selfLink) {
    return undefined
  }
  return {
    type: 'object',
    properties: {
      self: {
        type: 'string',
        format: 'uri',
        example: `https://domain${selfLink}`,
      },
    },
  }
}

const buildRelationships = ({ versionsLink, relations = [] } = {}) => {
  const versionRelationship = versionsLink && {
    type: 'object',
    properties: {
      links: {
        type: 'object',
        properties: {
          self: {
            type: 'string',
            format: 'uri',
            example: `https://domain${versionsLink}`,
          },
        },
      },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            id: { type: 'string' },
          },
        },
      },
    },
  }

  const relationKeys = relations.reduce((obj, { key, selfLink }) => {
    return {
      ...obj,
      [key]: {
        type: 'object',
        properties: {
          links: {
            type: 'object',
            properties: {
              self: {
                type: 'string',
                format: 'uri',
                example: `https://domain${selfLink}`,
              },
            },
          },
        },
      },
    }
  }, {})

  const relationships = {
    type: 'object',
    properties: {},
  }

  if (versionRelationship) {
    relationships.properties.versions = versionRelationship
  }

  if (relationKeys) {
    relationships.properties = {
      ...relationships.properties,
      ...relationKeys,
    }
  }

  return relationships
}

const buildIncluded = include => {
  if (!include || include.length === 0) {
    return undefined
  }
  const included = {
    type: 'array',
    example: include.map(type => {
      return {
        attributes: {},
        id: '1234',
        type,
      }
    }),
    items: {
      oneOf: include.map(type => {
        return {
          type: 'object',
          properties: {
            type: { type: 'string', default: type, example: type },
            id: { type: 'string' },
            attributes: {
              $ref: `__ROOT__${type}`,
            },
          },
        }
      }),
    },
  }
  return included
}

module.exports = function buildResponse({
  description,
  format,
  include = null,
  operationId,
  relations,
  resource,
  selfLink,
  versionsLink,
}) {
  const name = `${operationId}Response`
  const relationships = buildRelationships({ relations, versionsLink })
  const links = buildLinks({ selfLink })
  const included = buildIncluded(include)
  const base = {
    name,
    schema: {
      description: description || 'this is a desc',
      content: {
        additionalProperties: false,
        type: 'object',
        properties: {
          data: {},
          included,
          links,
          jsonapi: {
            type: 'object',
          },
          meta: {
            type: 'object',
          },
        },
        required: ['data'],
      },
    },
  }

  const item = {
    type: 'object',
    additionalProperties: false,
    properties: {
      type: {
        type: 'string',
        default: resource,
      },
      id: {
        type: 'string',
        example: '1234',
      },
      attributes: {
        $ref: `__ROOT__${resource}`,
      },
      relationships,
    },
  }

  if (format === 'array') {
    base.schema.content.properties.data = {
      type: 'array',
      additionalProperties: false,
      items: item,
    }

    return base
  }

  base.schema.content.properties.data = item

  return base
}
