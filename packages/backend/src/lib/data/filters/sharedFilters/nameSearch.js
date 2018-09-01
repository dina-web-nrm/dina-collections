module.exports = {
  description: 'Filter by string search, example swe',
  inputSchema: {
    type: 'string',
  },
  key: 'nameSearch',
  sequelizeFilterFunction: ({ value, Op }) => {
    if (value === undefined) {
      return null
    }

    return {
      'document.name': {
        [Op.iLike]: `%${value.toLowerCase()}%`,
      },
    }
  },
}
