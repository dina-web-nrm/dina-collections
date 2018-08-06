module.exports = {
  description: 'Match collecting date',
  elasticsearch: ({ value }) => {
    if (!value) {
      return {}
    }

    if (value.startDate && value.endDate) {
      return {
        range: {
          'attributes.collectingLocations.raw': {
            gte: value.startDate,
            lte: value.endDate,
          },
        },
      }
    }

    if (value.endDate) {
      return {
        range: {
          'attributes.collectingLocations.raw': {
            lte: value.endDate,
          },
        },
      }
    }

    if (value.startDate) {
      return {
        range: {
          'attributes.collectingLocations.raw': {
            gte: value.startDate,
          },
        },
      }
    }
    return null
  },
  inputSchema: {
    type: 'object',
  },
  key: 'matchCollectingDate',
}
