module.exports = {
  description: '',
  elasticsearch: ({ value }) => {
    return {
      match: {
        'attributes.ageStage.raw': {
          query: value,
        },
      },
    }
  },
  inputSchema: {
    type: 'string',
  },
  key: 'matchAgeStage',
}
