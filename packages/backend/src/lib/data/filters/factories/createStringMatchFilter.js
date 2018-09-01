module.exports = function createStringMatchFilter({
  description,
  fieldPath,
  key,
}) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value }) => {
      return {
        match: {
          [rawPath]: {
            query: value,
          },
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
    key,
    sequelizeFilterFunction: ({ value }) => {
      if (value === undefined) {
        return null
      }

      return {
        [`document.${fieldPath}`]: value.toLowerCase(),
      }
    },
  }
}
