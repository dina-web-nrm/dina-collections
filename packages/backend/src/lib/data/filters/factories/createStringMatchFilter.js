module.exports = function createStringMatchFilter({
  description,
  fieldPath,
  key,
  lowerCase = true,
}) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value }) => {
      return {
        term: {
          [rawPath]: value,
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
        [`document.${fieldPath}`]: lowerCase ? value.toLowerCase() : value,
      }
    },
  }
}
