const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')
const interpretEqual = require('./interpretEqual')
const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function createWordRegexp(word) {
  const { hasEqual, hasStar } = extractFlags(word)
  if (hasStar) {
    return interpretStar(word)
  }

  if (hasEqual) {
    return interpretEqual(word)
  }
  return [MATCH_ANY, WORD_DELIMITER, word, MATCH_ANY, WORD_DELIMITER].join('')
}
