module.exports = {
  description: 'Raw filtering for elasticsearch',
  elasticsearch: input => {
    return input
  },
  inputSchema: {
    type: 'object',
  },
  key: 'parentId',
}
