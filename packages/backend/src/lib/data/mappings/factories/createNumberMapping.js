module.exports = function createNumberMapping({ fieldPath }) {
  return {
    elasticsearch: () => {
      return {
        scaling_factor: 100,
        type: 'scaled_float',
      }
    },
    fieldPath,
  }
}
