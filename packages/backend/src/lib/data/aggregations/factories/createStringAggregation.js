const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

module.exports = function createStringAggregation({
  description,
  fieldPath,
  resource,
}) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ options = {} }) => {
      const { contains: containsInput, limit = 10 } = options

      if (containsInput) {
        const contains = containsInput.replace(/(?=[() ])/g, '\\')
        const containsCapitalized = capitalizeFirstLetter(contains)
        return {
          terms: {
            field: rawPath,
            include: `.*${contains}.*|.*${containsCapitalized}.*`,
            size: limit,
          },
        }
      }
      return {
        terms: {
          field: rawPath,
          size: limit,
        },
      }
    },
    inputSchema: {
      type: 'string',
    },
    resource,
  }
}
