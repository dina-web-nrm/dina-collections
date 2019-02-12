module.exports = function createStringInFilter({
  description,
  fieldPath,
  key,
}) {
  return {
    description: description || `${fieldPath} equals any of input`,
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
        [`${fieldPath}`]: {
          [Op.in]: value,
        },
      }
    },
  }
}
