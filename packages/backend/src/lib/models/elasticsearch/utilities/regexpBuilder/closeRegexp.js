const { STRING_START, STRING_END } = require('./constants')

module.exports = function closeRegexp(input) {
  return [STRING_START, input, STRING_END].join('')
}
