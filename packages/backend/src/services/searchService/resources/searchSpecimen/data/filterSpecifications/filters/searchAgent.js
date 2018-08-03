module.exports = {
  description: 'Search agents',
  elasticsearch: ({ value }) => {
    return {
      match_phrase_prefix: {
        'attributes.agents': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'searchAgents',
}
