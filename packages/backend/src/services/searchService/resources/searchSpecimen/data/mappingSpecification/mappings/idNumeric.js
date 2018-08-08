module.exports = {
  description: 'Create mapping for id in numeric format',
  elasticsearch: () => {
    return {
      type: 'keyword',
    }
  },
  fieldPath: 'attributes.idNumeric',
}
