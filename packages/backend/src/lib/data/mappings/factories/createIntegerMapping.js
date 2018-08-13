module.exports = function createIntegerMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        type: 'integer',
      }
    },
    fieldPath,
  }
}
