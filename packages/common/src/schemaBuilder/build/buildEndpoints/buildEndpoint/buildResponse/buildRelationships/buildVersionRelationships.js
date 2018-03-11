module.exports = function buildVersionRelationships({ versionsLink }) {
  return (
    versionsLink && {
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
  )
}
