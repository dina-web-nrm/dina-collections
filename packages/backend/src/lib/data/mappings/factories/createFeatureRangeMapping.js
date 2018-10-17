module.exports = function createFeatureRangeMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        properties: {
          rangeType: {
            fields: {
              raw: {
                ignore_above: 256,
                normalizer: 'lowerCaseNormalizer',
                type: 'keyword',
              },
            },
            type: 'text',
          },

          rangeValue: {
            scaling_factor: 100,
            type: 'scaled_float',
          },
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
        },
        type: 'nested',
      }
    },
    fieldPath,
  }
}
