module.exports = function createStringSearchFilter({
  description,
  fieldPath,
  key,
}) {
  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ value }) => {
      return {
        match_phrase_prefix: {
          [fieldPath]: {
            query: value,
          },
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
    key,
    sequelizeFilterFunction: ({ Op, value }) => {
      if (value === undefined) {
        return null
      }

      return {
        [`document.${fieldPath}`]: {
          [Op.iLike]: `%${value.toLowerCase()}%`,
        },
      }
    },
  }
}
