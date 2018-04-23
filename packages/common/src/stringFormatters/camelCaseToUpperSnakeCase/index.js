module.exports = function camelCaseToUpperSnakeCase(string) {
  if (!string) {
    return string
  }
  return string.replace(/([A-Z])/g, '_$1').toUpperCase()
}
