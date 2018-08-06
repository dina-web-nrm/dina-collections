module.exports = {
  description: 'Match collecting place',
  elasticsearch: ({ value }) => {
    return {
      match: {
        'attributes.collectingPlaces.raw': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'matchCollectingPlace',
}
