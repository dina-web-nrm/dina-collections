const extractFlags = require('./extractFlags')
const interpretStar = require('./interpretStar')
const closeRegexp = require('./closeRegexp')
const { WORD_DELIMITER } = require('./constants')

module.exports = function createWholeFieldRegexp({ env, input }) {
  const { hasStar } = extractFlags(input)
  let str = input.replace(/=+/g, '')

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
