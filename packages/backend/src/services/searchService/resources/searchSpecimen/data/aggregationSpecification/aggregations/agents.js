/* eslint-disable camelcase */

module.exports = {
  description: 'Aggregate agent',
  elasticsearch: ({ options = {} }) => {
    const { contains, limit = 10 } = options

    if (contains) {
      return {
        terms: {
          field: 'attributes.agents.raw',
          include: `.*${contains}.*`,
          size: limit,
        },
      }
    }
    return {
      terms: {
        field: 'attributes.agents.raw',
        size: limit,
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'agents',
  resource: 'specimenAgents',
}
