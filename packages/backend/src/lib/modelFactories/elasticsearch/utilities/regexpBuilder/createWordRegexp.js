const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')
const interpretEqual = require('./interpretEqual')
const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function createWordRegexp({
  firstWord = true,
  hasEqual: inputHasEqual,
  input,
}) {
  const { hasEqual: wordHasEqual, hasStar } = extractFlags(input)

  const hasEqual = inputHasEqual || (firstWord ? wordHasEqual : false)

  if (hasStar) {
    return interpretStar(input)
  }

  if (hasEqual) {
    return interpretEqual({ input, stripEqual: firstWord })
  }
  return [MATCH_ANY, WORD_DELIMITER, input, MATCH_ANY, WORD_DELIMITER].join('')
}
