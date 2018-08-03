module.exports = {
  description: 'Create mapping for collectingEndDate',
  elasticsearch: () => {
    return {
      type: 'date',
    }
  },
  fieldPath: 'attributes.collectingEndDate',
}
