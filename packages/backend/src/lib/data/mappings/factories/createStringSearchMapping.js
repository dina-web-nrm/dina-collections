module.exports = function createStringSearchMapping({
  fieldPath,
  searchFieldPath,
}) {
  return [
    {
      elasticsearch: () => {
        return {
          ignore_above: 256,
          normalizer: 'lowerCaseNormalizer',
          type: 'keyword',
        }
      },
      fieldPath: searchFieldPath,
    },

    {
      elasticsearch: () => {
        return {
          ignore_above: 256,
          type: 'keyword',
        }
      },
      fieldPath,
    },
  ]
}
