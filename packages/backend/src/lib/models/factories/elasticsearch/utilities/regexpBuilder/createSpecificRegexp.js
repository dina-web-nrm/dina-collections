const createNotMatchingRegexp = require('./createNotMatchingRegexp')
const { MATCH_ANY, WHITESPACE } = require('./constants')

module.exports = function createSpecificRegexp(input) {
  if (input === ' ') {
    return [createNotMatchingRegexp()]
  }
  if (input === '" "') {
    return [[WHITESPACE, MATCH_ANY, WHITESPACE, MATCH_ANY, WHITESPACE].join('')]
  }
  return null
}
