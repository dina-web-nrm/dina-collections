module.exports = {
  description: 'Filter by string search, example swe',
  inputSchema: {
    type: 'string',
  },
  key: 'search',
  sequelizeFilterFunction: ({ value, Op }) => {
    if (value === undefined) {
      return null
    }
    return {
      'document.name': {
        [Op.like]: `%${value.toLowerCase()}%`,
      },
    }
  },
}
