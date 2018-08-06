module.exports = {
  description: 'Match collecting information',
  elasticsearch: ({ value }) => {
    return {
      match: {
        'attributes.collectingLocations.raw': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'matchCollectingLocation',
}
