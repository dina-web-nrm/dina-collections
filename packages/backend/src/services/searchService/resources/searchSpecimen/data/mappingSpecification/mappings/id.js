module.exports = {
  description: 'Create mapping for id',
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
  fieldPath: 'id',
}
