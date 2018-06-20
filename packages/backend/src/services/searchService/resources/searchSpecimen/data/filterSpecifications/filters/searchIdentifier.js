module.exports = {
  description: 'Match identifiers',
  elasticsearch: ({ value }) => {
    return {
      match_phrase_prefix: {
        identifiers: {
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
