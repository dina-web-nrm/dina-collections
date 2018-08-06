/* eslint-disable camelcase */

module.exports = {
  description: 'Aggregate collectingLocations',
  elasticsearch: ({ options = {} }) => {
    const { contains, limit = 10 } = options

    if (contains) {
      return {
        terms: {
          field: 'attributes.collectingLocations.raw',
          include: `.*${contains}.*`,
          size: limit,
        },
      }
    }
    return {
      terms: {
        field: 'attributes.collectingLocations.raw',
        size: limit,
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'collectingLocations',
  resource: 'specimenCollectingLocation',
}
