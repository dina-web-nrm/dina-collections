module.exports = {
  description: 'Match identifiers',
  elasticsearch: ({ value }) => {
    return {
      match_phrase: {
        identifiers: {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'matchIdentifier',
}
