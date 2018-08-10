module.exports = function createStringSearchFilter({ description, fieldPath }) {
  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ value }) => {
      return {
        match_phrase_prefix: {
          [fieldPath]: {
            query: value,
          },
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
  }
}
