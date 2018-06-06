module.exports = {
  js: () => {},
  key: 'updatedAfter',
  queryParams: {
    description: 'Filter by updatedAt after specificed timestamp',
    schema: {
      type: 'string',
    },
  },
  sequelizeFilterFunction: ({ value, Op }) => {
    if (!value) {
      return null
    }

    return {
      updatedAt: {
        [Op.gt]: value,
      },
    }
  },
}
