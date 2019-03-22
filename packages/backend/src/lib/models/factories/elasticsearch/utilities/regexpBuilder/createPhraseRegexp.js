const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')

const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function createPhraseRegexp(input) {
  const { hasStar } = extractFlags(input)
  let str = input.slice(1, -1)
  if (hasStar) {
    str = interpretStar(str)
  } else {
    str = [WORD_DELIMITER, str, WORD_DELIMITER].join('')
  }

  return [MATCH_ANY, str, MATCH_ANY].join('')
}
