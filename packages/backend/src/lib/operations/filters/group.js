module.exports = {
  js: () => {},
  key: 'group',
  queryParams: {
    description: 'Filter by group',
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
      'document.group': value,
    }
  },
}
