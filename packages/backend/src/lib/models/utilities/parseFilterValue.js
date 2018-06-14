module.exports = function parseFilterValue(input) {
  if (!input) {
    return input
  }

  if (typeof input === 'string') {
    if (input === 'false') {
      return false
    }
    if (input === 'true') {
      return true
    }
    if (input === 'null') {
      return null
    }
  }
  return input
}
