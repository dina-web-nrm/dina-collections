module.exports = function createKeywordMapping({
  fieldPath,
  lowercase = false,
}) {
  return {
    elasticsearch: () => {
      if (lowercase) {
        return {
          ignore_above: 256,
          normalizer: 'lowerCaseNormalizer',
          type: 'keyword',
        }
      }
      return {
        ignore_above: 256,
        type: 'keyword',
      }
    },
    fieldPath,
  }
}
