module.exports = function columnArrayToObject(columnArray) {
  if (!columnArray) {
    return columnArray
  }
  return columnArray.reduce((obj, item) => {
    obj[item.lid] = item // eslint-disable-line no-param-reassign
    return obj
  }, {})
}
