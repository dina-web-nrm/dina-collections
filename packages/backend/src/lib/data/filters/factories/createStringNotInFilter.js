module.exports = function createStringInFilter({
  description,
  fieldPath,
  key,
}) {
  return {
    description: description || `${fieldPath} dont equals any of input`,
    inputSchema: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
    key,
    sequelizeFilterFunction: ({ value, Op }) => {
      if (value === undefined) {
        return null
      }

      if (value.length === 0) {
        return null
      }

      return {
        [Op.or]: {
          [`${fieldPath}`]: {
            [Op.notIn]: value,
          },
          [`${fieldPath}`]: {
            [Op.eq]: null,
          },
        },
      }
    },
  }
}
