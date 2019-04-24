const createNotMatchingRegexp = require('./createNotMatchingRegexp')
const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function interpretEqual({ input, stripEqual = true }) {
  if (input.length < 2) {
    return createNotMatchingRegexp()
  }
  let sanitizedInput = input
  if (input[0] === '=' && stripEqual) {
    sanitizedInput = input.substr(1)
  }

  return [
    MATCH_ANY,
    WORD_DELIMITER,
    sanitizedInput,
    WORD_DELIMITER,
    MATCH_ANY,
  ].join('')
}
