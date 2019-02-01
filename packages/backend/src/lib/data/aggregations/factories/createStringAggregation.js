module.exports = function createStringAggregation({
  defaultLimit = 10,
  description,
  fieldPath,
  resource,
}) {
  const rawPath = `${fieldPath}.raw`
  return {
    description: description || `Aggregation for: ${fieldPath}`,
    elasticsearch: ({ input = {} }) => {
      const { contains: containsInput, limit = defaultLimit } = input

      if (containsInput) {
        const contains = containsInput.replace(/(?=[() ])/g, '\\').toLowerCase()
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
