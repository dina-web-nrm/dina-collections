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
          rangeUnit: {
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
        },
        type: 'nested',
      }
    },
    fieldPath,
  }
}
