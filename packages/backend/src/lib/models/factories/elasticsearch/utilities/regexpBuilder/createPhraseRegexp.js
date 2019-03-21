const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')
const closeRegexp = require('./closeRegexp')
const { WORD_DELIMITER } = require('./constants')

module.exports = function createPhraseRegexp({ env, phrase }) {
  const { hasStar } = extractFlags(phrase)
  let str = phrase.replace(/"+/g, '')

  if (hasStar) {
    str = interpretStar(str)
  } else {
    str = [WORD_DELIMITER, str, WORD_DELIMITER].join('')
  }

  if (env === 'js') {
    str = closeRegexp(str)
  }

  return str
}
