module.exports = function createKeywordAndRawMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        fields: {
          raw: {
            ignore_above: 256,
            normalizer: 'lowerCaseNormalizer',
            type: 'keyword',
          },
        },
        type: 'text',
      }
    },
    fieldPath,
  }
}
