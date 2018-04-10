module.exports = function columnObjectToArray(columnObject) {
  if (!columnObject) {
    return columnObject
  }
  return Object.keys(columnObject)
    .sort((a, b) => {
      if (a > b) {
        return -1
      }
      if (b > a) {
        return 1
      }
      return 0
    })
    .map(key => {
      const column = columnObject[key]
      if (column.lid) {
        return column
      }

      column.lid = key
      return column
    })
}
