module.exports = function extractNormalizedColumns({
  doc = {},
  normalizedColumnNames,
}) {
  const { normalized, ...rest } = doc

  return normalizedColumnNames.reduce(
    (normalizedColumns, normalizedColumnName) => {
      return {
        ...normalizedColumns,
        [normalizedColumnName]: normalized[normalizedColumnName],
      }
    },
    {
      nonNormalized: rest,
    }
  )
}
