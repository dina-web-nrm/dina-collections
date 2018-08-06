module.exports = {
  description: 'Search collecting information',
  elasticsearch: ({ value }) => {
    return {
      match_phrase_prefix: {
        'attributes.collectingLocations': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'searchCollectingLocation',
}
