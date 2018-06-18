module.exports = {
  key: 'ids',
  queryParams: {
    description: 'Filter by ids',
    schema: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
  },
  sequelizeFilterFunction: ({ value, Op }) => {
    if (!value) {
      return null
    }

    return {
      id: {
        [Op.in]: value,
      },
    }
  },
}
