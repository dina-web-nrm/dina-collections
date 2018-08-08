module.exports = function createKeywordMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        fields: {
          raw: {
            ignore_above: 256,
            type: 'keyword',
          },
        },
        type: 'text',
      }
    },
    fieldPath,
  }
}
