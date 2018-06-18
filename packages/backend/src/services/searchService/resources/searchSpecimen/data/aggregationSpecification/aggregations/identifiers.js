/* eslint-disable camelcase */

module.exports = {
  description: 'Aggregate identifiers',
  elasticsearch: ({ options = {} }) => {
    const { contains, limit = 10 } = options

    if (contains) {
      return {
        terms: {
          field: 'collectingLocations.raw',
          include: `.*${contains}.*`,
          size: limit,
        },
      }
    }
    return {
      terms: {
        field: 'collectingLocations.raw',
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
