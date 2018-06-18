module.exports = {
  description: 'Filter by parentId, example 123',
  inputSchema: {
    type: 'string',
  },
  key: 'parentId',

  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }
    return {
      parentId: value,
    }
  },
}
