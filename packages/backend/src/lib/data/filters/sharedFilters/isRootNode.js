module.exports = {
  description: 'Find root node',
  inputSchema: {
    type: 'boolean',
  },
  key: 'isRootNode',
  sequelizeFilterFunction: ({ value }) => {
    if (value !== true) {
      return null
    }

    return {
      'document.isRoot': true,
    }
  },
}
