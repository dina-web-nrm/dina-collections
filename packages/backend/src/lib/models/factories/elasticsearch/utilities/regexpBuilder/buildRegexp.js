const extractFlags = require('./extractFlags')
const sanitizeInput = require('./sanitizeInput')
const validateSanitizedInput = require('./validateSanitizedInput')
const createPhraseRegexp = require('./createPhraseRegexp')
const createWordRegexp = require('./createWordRegexp')
const createNotMatchingRegexp = require('./createNotMatchingRegexp')
const createMultiWordRegexp = require('./createMultiWordRegexp')

module.exports = function buildRegexp({ env, input, throwOnError }) {
  let regexp = ''
  try {
    const sanitizedInput = sanitizeInput(input)

    validateSanitizedInput(sanitizedInput)
    const { hasSpace, noFlags, hasPhrase } = extractFlags(sanitizedInput)

    if (noFlags) {
      regexp = createWordRegexp(sanitizedInput)
    } else if (hasPhrase) {
      regexp = createPhraseRegexp({ env, phrase: sanitizedInput })
    } else if (hasSpace) {
      regexp = createMultiWordRegexp(sanitizedInput)
    } else {
      regexp = createWordRegexp(sanitizedInput)
    }
  } catch (err) {
    if (throwOnError) {
      throw err
    }
    regexp = createNotMatchingRegexp()
  }

  if (!Array.isArray(regexp)) {
    return [regexp]
  }
  return regexp
}
