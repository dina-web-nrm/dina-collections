module.exports = {
  key: 'deactivated',
  queryParams: {
    description: 'Get deactivated',
    required: false,
    schema: {
      type: 'boolean',
    },
  },
  sequelizeFilterFunction: ({ value, Op }) => {
    if (value !== true) {
      return null
    }
    return {
      deactivatedAt: {
        [Op.ne]: null,
      },
    }
  },
}
