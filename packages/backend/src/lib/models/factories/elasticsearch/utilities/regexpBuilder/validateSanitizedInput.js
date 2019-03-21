const extractFlags = require('./extractFlags')

module.exports = function validateSanitizedInput(input) {
  if (!input.match(/^[a-zA-Z0-9\s*"=,;/\-ÅÄÖåäö]*$/g)) {
    throw new Error('input contains invalid characters')
  }
  const { hasEqual, hasStar, hasPhrase } = extractFlags(input)
  if (hasEqual && hasStar) {
    throw new Error('not allowed to combine = and *')
  }
  if (hasEqual && hasPhrase) {
    throw new Error('not allowed to combine = and "')
  }
  if (hasPhrase) {
    const numberOfQuotes = (input.match(/"/g) || []).length
    if (numberOfQuotes !== 2) {
      throw new Error(`expected 2 " but got ${numberOfQuotes}`)
    }
  }

  if (hasStar) {
    if (input.includes('**')) {
      const numberOfQuotes = (input.match(/"/g) || []).length
      if (numberOfQuotes !== 2) {
        throw new Error('** is not allowed')
      }
    }
  }
}
