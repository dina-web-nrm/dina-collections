module.exports = function createStringAggregation({
  description,
  fieldPath,
  resource,
}) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ options = {} }) => {
      const { contains, limit = 10 } = options

      if (contains) {
        return {
          terms: {
            field: rawPath,
            include: `.*${contains}.*`,
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
