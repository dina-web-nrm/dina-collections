const extractFlags = require('./extractFlags')
const sanitizeInput = require('./sanitizeInput')
const validateSanitizedInput = require('./validateSanitizedInput')
const createPhraseRegexp = require('./createPhraseRegexp')
const createWordRegexp = require('./createWordRegexp')
const createNotMatchingRegexp = require('./createNotMatchingRegexp')
const createMultiWordRegexp = require('./createMultiWordRegexp')
const createWholeFieldRegexp = require('./createWholeFieldRegexp')

module.exports = function buildRegexp({ env, input, throwOnError }) {
  let regexp = ''
  try {
    const sanitizedInput = sanitizeInput(input)

    validateSanitizedInput(sanitizedInput)
    const { hasFieldEqual, hasPhrase, hasSpace, noFlags } = extractFlags(
      sanitizedInput
    )

    if (noFlags) {
      regexp = createWordRegexp({ input: sanitizedInput })
    } else if (hasFieldEqual) {
      regexp = createWholeFieldRegexp({ env, input: sanitizedInput })
    } else if (hasPhrase) {
      regexp = createPhraseRegexp(sanitizedInput)
    } else if (hasSpace) {
      regexp = createMultiWordRegexp(sanitizedInput)
    } else {
      regexp = createWordRegexp({ input: sanitizedInput })
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
