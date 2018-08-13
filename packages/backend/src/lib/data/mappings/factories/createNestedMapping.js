module.exports = function createNestedMapping({ fieldPath }) {
  return {
    elasticsearch: innerMapping => {
      if (innerMapping) {
        return {
          type: 'nested',
          ...innerMapping,
        }
      }
      return {
        type: 'nested',
      }
    },
    fieldPath,
  }
}
