module.exports = function createNumberRangeFilter({ description, fieldPath }) {
  const rawPath = `${fieldPath}`
  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value }) => {
      if (!value) {
        return {}
      }
      const { min, max } = value

      if (min && max) {
        return {
          range: {
            [rawPath]: {
              gte: min,
              lte: max,
            },
          },
        }
      }

      if (max !== undefined) {
        return {
          range: {
            [rawPath]: {
              lte: max,
            },
          },
        }
      }

      if (min !== undefined) {
        return {
          range: {
            [rawPath]: {
              gte: min,
            },
          },
        }
      }

      return null
    },
    inputSchema: {
      type: 'string',
    },
  }
}
