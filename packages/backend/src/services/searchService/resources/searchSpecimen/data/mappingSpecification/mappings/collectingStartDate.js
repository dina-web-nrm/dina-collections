module.exports = {
  description: 'Create mapping for collectingStartDate',
  elasticsearch: () => {
    return {
      type: 'date',
    }
  },
  fieldPath: 'attributes.collectingStartDate',
}
