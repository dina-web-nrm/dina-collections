module.exports = function extractNormalizedColumns({
  doc = {},
  normalizedColumnNames,
}) {
  const { normalized, relationships, ...rest } = doc

  let base = {
    nonNormalized: rest,
  }

  if (relationships) {
    base = {
      ...base,
      relationships,
    }
  }

  return normalizedColumnNames.reduce(
    (normalizedColumns, normalizedColumnName) => {
      if (normalizedColumnName === 'relationships') {
        return normalizedColumns
      }
      return {
        ...normalizedColumns,
        [normalizedColumnName]: normalized[normalizedColumnName],
      }
    },
    base
  )
}
