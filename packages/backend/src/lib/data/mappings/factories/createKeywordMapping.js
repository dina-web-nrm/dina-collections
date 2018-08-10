module.exports = function createKeywordMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        ignore_above: 256,
        type: 'keyword',
      }
    },
    fieldPath,
  }
}
