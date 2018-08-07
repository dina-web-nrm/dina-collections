module.exports = {
  description: 'Create mapping for ageStage',
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
  fieldPath: 'attributes.ageStage',
}
