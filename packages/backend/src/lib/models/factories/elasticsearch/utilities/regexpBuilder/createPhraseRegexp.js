const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')

const { MATCH_ANY } = require('./constants')

module.exports = function createPhraseRegexp(input) {
  const { hasStar } = extractFlags(input)
  let str = input.slice(1, -1)
  if (hasStar) {
    str = interpretStar(str)
  }
  return [MATCH_ANY, str, MATCH_ANY].join('')
}
