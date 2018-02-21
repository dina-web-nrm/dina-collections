module.exports = function buildRelationships({ relations, versionsLink } = {}) {
  const versionRelationship = versionsLink && {
    properties: {
      data: {
        items: {
          properties: {
            id: { type: 'string' },
            type: { type: 'string' },
          },
          type: 'object',
        },
        type: 'array',
      },
      links: {
        properties: {
          self: {
            example: `https://domain${versionsLink}`,
            type: 'string',
            'x-faker': 'internet.url',
          },
        },
        type: 'object',
      },
    },
    type: 'object',
  }

  const relationKeys = (relations || []).reduce(
    (
      obj,
      { format: relationFormat = 'object', key, link, resource: resourceInput }
    ) => {
      const resource = resourceInput || key
      const data = {
        properties: {
          id: {
            example: '1234',
            type: 'string',
          },
          type: {
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
          ...obj,
          [key]: {
            properties: {
              data,
              links,
            },
            type: 'object',
          },
        }
      }
      return {
        ...obj,
        [key]: {
          properties: {
            data: {
              items: data,
              type: 'array',
            },
            links,
          },
          type: 'object',
        },
      }
    },
    {}
  )

  const relationships = {
    properties: {},
    type: 'object',
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
