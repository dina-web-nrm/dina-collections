const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function interpretStar(str) {
  return [WORD_DELIMITER, str, WORD_DELIMITER]
    .join('')
    .replace(/\*+/g, MATCH_ANY)
}
