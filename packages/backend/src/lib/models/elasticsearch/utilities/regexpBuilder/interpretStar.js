const { MATCH_ANY, WORD_DELIMITER } = require('./constants')

module.exports = function interpretStar(str) {
  return [
    MATCH_ANY,
    WORD_DELIMITER,
    str.replace(/\*+/g, MATCH_ANY),
    WORD_DELIMITER,
  ].join('')
}
