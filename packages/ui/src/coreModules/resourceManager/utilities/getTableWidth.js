export default function getTableWidth({
  inludeColumns = null,
  tableColumnSpecifications,
}) {
  return tableColumnSpecifications.reduce((totalWidth, { name, width }) => {
    if (!inludeColumns || inludeColumns.includes(name)) {
      return totalWidth + width
    }

    return totalWidth
  }, 80) // "Row #"" is always visible with this width
}
