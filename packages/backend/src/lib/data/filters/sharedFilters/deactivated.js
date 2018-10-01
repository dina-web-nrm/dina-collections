module.exports = {
  description: 'Get deactivated',
  inputSchema: {
    type: 'boolean',
  },
  key: 'deactivated',
  sequelizeFilterFunction: ({ value, Op }) => {
    if (value !== true) {
      return {
        deactivatedAt: {
          [Op.eq]: null,
        },
      }
    }
    return {
      deactivatedAt: {
        [Op.ne]: null,
      },
    }
  },
}
