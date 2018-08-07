module.exports = {
  description: '',
  elasticsearch: ({ value }) => {
    return {
      match_phrase_prefix: {
        'attributes.ageStage': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'searchAgeStage',
}
