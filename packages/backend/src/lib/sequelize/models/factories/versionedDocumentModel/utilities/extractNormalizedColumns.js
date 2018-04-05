module.exports = function extractNormalizedColumns({
  doc,
  normalizedColumnNames,
}) {
  return normalizedColumnNames.reduce(
    (normalizedColumns, normalizedColumnName) => {
      return {
        ...normalizedColumns,
        [normalizedColumnName]: doc[normalizedColumnName],
      }
    },
    {}
  )
}
