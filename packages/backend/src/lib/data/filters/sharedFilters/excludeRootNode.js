module.exports = {
  description: 'Exclude root node',
  inputSchema: {
    type: 'boolean',
  },
  key: 'excludeRootNode',
  sequelizeFilterFunction: ({ value, Op }) => {
    if (value !== true) {
      return null
    }

    return {
      'document.isRoot': {
        [Op.not]: true,
      },
    }
  },
}
