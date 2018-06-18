module.exports = {
  key: 'search',
  queryParams: {
    description: 'Filter by string search, example swe',
    required: false,
    schema: {
      type: 'string',
    },
  },
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
