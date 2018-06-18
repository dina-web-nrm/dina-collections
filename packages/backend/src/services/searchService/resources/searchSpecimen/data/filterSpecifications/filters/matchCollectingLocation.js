module.exports = {
  description: 'Match collecting information',
  elasticsearch: ({ value }) => {
    return {
      match_phrase: {
        collectingLocations: {
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
