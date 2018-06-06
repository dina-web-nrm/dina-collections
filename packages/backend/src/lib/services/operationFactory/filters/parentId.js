module.exports = {
  js: () => {},
  key: 'parentId',
  queryParams: {
    description: 'Filter by parentId, example 123',
    required: false,
    schema: {
      type: 'string',
    },
  },
  sequelizeFilterFunction: ({ value }) => {
    if (value === undefined) {
      return null
    }
    return {
      id: value,
    }
  },
}
