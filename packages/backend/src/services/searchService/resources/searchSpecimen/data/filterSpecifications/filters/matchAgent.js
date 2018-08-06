module.exports = {
  description: 'Match agent',
  elasticsearch: ({ value }) => {
    return {
      match: {
        'attributes.agents.raw': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'matchAgent',
}
