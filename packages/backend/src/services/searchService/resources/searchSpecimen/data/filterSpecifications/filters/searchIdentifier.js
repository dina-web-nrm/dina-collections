module.exports = {
  description: 'Search identifiers',
  elasticsearch: ({ value }) => {
    return {
      match_phrase_prefix: {
        'attributes.identifiers': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'searchIdentifier',
}
