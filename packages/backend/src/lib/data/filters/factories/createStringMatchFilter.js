module.exports = function createStringMatchFilter({ description, fieldPath }) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value }) => {
      return {
        match: {
          [rawPath]: {
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
