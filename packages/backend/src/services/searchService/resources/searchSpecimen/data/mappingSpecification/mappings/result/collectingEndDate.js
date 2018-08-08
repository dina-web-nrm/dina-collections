module.exports = {
  description: '',
  elasticsearch: () => {
    return {
      index: false,
      type: 'text',
    }
  },
  fieldPath: 'attributes.result.collectingEndDate',
}
