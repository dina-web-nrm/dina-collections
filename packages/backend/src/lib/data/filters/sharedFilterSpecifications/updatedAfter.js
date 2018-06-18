module.exports = {
  description: 'Filter by updatedAt after specificed timestamp',
  inputSchema: {
    format: 'date-time',
    type: 'string',
  },
  key: 'updatedAfter',
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
