module.exports = function createFeatureRangeMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        properties: {
          rangeUnit: {
            ignore_above: 256,
            normalizer: 'lowerCaseNormalizer',
            type: 'keyword',
          },
          rangeValue: {
            scaling_factor: 100,
            type: 'scaled_float',
          },
          tagType: {
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
