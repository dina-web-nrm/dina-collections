module.exports = {
  description: 'Get deactivated',
  inputSchema: {
    type: 'boolean',
  },
  key: 'deactivated',
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
