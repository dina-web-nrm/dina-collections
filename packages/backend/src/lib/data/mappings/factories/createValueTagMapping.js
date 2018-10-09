module.exports = function createKeywordMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        properties: {
          tagType: {
            fields: {
              raw: {
                ignore_above: 256,
                normalizer: 'lowerCaseNormalizer',
                type: 'keyword',
              },
            },
            type: 'text',
          },
          tagValue: {
            fields: {
              raw: {
                ignore_above: 256,
                normalizer: 'lowerCaseNormalizer',
                type: 'keyword',
              },
            },
            type: 'text',
          },
        },
        type: 'nested',
      }
    },
    fieldPath,
  }
}
