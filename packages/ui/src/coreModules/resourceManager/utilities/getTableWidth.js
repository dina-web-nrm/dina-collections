export default function getTableWidth({
  includeColumns = null,
  tableColumnSpecifications,
}) {
  return tableColumnSpecifications.reduce((totalWidth, { name, width }) => {
    if (!includeColumns || includeColumns.includes(name)) {
      return totalWidth + width
    }

    return totalWidth
  }, 80)
}
