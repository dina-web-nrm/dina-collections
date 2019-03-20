const createNotMatchingRegexp = require('./createNotMatchingRegexp')
const { WORD_DELIMITER } = require('./constants')

module.exports = function interpretEqual(input) {
  if (input.length < 2) {
    return createNotMatchingRegexp()
  }

  if (input[0] !== '=') {
    throw new Error('Expect = to be first character')
  }
  return [WORD_DELIMITER, input.substr(1), WORD_DELIMITER].join('')
}
