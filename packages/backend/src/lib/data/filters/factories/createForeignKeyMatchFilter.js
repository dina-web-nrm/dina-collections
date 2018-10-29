module.exports = function createForeignKeyMatchFilter({
  description,
  fieldPath,
  key,
}) {
  return {
    description,
    inputSchema: {
      type: 'string',
    },
    key,
    sequelizeFilterFunction: ({ value }) => {
      if (value === undefined) {
        return null
      }

      return {
        [fieldPath]: value.toLowerCase(),
      }
    },
  }
}
