module.exports = {
  description: 'Create mapping for id in numeric format',
  elasticsearch: () => {
    return {
      type: 'integer',
    }
  },
  key: 'idNumeric',
}
