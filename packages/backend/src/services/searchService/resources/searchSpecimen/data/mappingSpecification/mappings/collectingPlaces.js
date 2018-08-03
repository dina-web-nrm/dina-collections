module.exports = {
  description: 'Create mapping for collectingPlaces',
  elasticsearch: () => {
    return {
      fields: {
        raw: {
          ignore_above: 256,
          type: 'keyword',
        },
      },
      type: 'text',
    }
  },
  fieldPath: 'attributes.collectingPlaces',
}
