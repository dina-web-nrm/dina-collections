module.exports = {
  description: 'Match identifiers',
  elasticsearch: ({ value }) => {
    return {
      match: {
        'attributes.identifiers.raw': {
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
