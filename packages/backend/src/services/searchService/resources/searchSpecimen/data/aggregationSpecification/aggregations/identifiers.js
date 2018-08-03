/* eslint-disable camelcase */

module.exports = {
  description: 'Aggregate identifiers',
  elasticsearch: ({ options = {} }) => {
    const { contains, limit = 10 } = options

    if (contains) {
      return {
        terms: {
          field: 'attributes.identifiers.raw',
          include: `.*${contains}.*`,
          size: limit,
        },
      }
    }
    return {
      terms: {
        field: 'attributes.identifiers.raw',
        size: limit,
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'identifiers',
  resource: 'specimenIdentifier',
}
