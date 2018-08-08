/* eslint-disable camelcase */

module.exports = {
  description: 'Aggregate age stage',
  elasticsearch: ({ options = {} }) => {
    const { contains, limit = 10 } = options

    if (contains) {
      return {
        terms: {
          field: 'attributes.ageStage.raw',
          include: `.*${contains}.*`,
          size: limit,
        },
      }
    }
    return {
      terms: {
        field: 'attributes.ageStage.raw',
        size: limit,
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'ageStage',
  resource: 'specimenAgeStage',
}
