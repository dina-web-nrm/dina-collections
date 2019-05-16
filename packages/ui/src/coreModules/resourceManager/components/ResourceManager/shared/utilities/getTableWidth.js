export default function getTableWidth({
  includeColumns = null,
  tableColumnSpecifications,
}) {
  return tableColumnSpecifications.reduce(
    (totalWidth, { fieldPath, width }) => {
      if (!includeColumns || includeColumns.includes(fieldPath)) {
        return totalWidth + width
      }

      return totalWidth
    },
    0
  )
}
