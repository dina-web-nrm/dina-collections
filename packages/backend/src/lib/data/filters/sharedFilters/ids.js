module.exports = {
  description: 'Filter by ids',
  elasticsearch: ({ value }) => {
    return {
      terms: {
        id: value,
      },
    }
  },
  inputSchema: {
    items: {
      type: 'string',
    },
    type: 'array',
  },
  key: 'ids',
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
