module.exports = {
  description: 'Create mapping for agents',
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
  fieldPath: 'attributes.agents',
}
