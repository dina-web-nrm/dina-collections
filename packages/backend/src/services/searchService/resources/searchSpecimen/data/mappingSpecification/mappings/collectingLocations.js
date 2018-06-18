module.exports = {
  description: 'Create mapping for collectingLocations',
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
  key: 'collectingLocations',
}
