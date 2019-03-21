module.exports = function createKeywordMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        properties: {
          key: {
            ignore_above: 256,
            normalizer: 'lowerCaseNormalizer',
            type: 'keyword',
          },
          tagText: {
            type: 'keyword',
          },
          tagType: {
            ignore_above: 256,
            normalizer: 'lowerCaseNormalizer',
            type: 'keyword',
          },
          tagValue: {
            ignore_above: 256,
            normalizer: 'lowerCaseNormalizer',
            type: 'keyword',
          },
        },
        type: 'nested',
      }
    },
    fieldPath,
  }
}
