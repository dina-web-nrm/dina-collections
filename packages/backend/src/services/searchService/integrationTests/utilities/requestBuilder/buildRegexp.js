const sanitizeInput = input => {
  const withoutDoubleBlanks = input.replace(/\s\s+/g, ' ')
  return withoutDoubleBlanks
}

const extractFlags = input => {
  let hasSpace = false
  let hasEqual = false
  let hasStar = false
  let hasPhrase = false
  if (input.includes(' ')) {
    hasSpace = true
  }

  if (input.includes('=')) {
    hasEqual = true
  }

  if (input.includes('*')) {
    hasStar = true
  }

  if (input.includes('"')) {
    hasPhrase = true
  }

  return {
    hasEqual,
    hasPhrase,
    hasSpace,
    hasStar,
    noFlags: !(hasSpace || hasEqual || hasStar || hasPhrase),
  }
}

const validateSanitizedInput = input => {
  if (!input.match(/^[a-zA-Z0-9\s*"=]*$/g)) {
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

const interpretStar = str => {
  return `\\b${str.replace(/\*+/g, '.*')}\\b`
}

const createPhraseMatch = phrase => {
  const { hasStar } = extractFlags(phrase)
  let str = phrase.replace(/"+/g, '')

  if (hasStar) {
    str = interpretStar(str)
  }
  return `^${str}$`
}

const createWordMatch = word => {
  const { hasEqual, hasStar, hasPhrase } = extractFlags(word)
  if (hasStar) {
    return interpretStar(word)
  }

  if (hasPhrase) {
    return `^${word.replace(/"+/g, '')}$`
  }
  if (hasEqual && word[0] === '=') {
    if (word.length === 1) {
      return '^$'
    }
    return `\\b${word.substr(1)}\\b`
  }

  return `\\b${word}`
}

module.exports = function buildRegexp(input) {
  const sanitizedInput = sanitizeInput(input)
  validateSanitizedInput(sanitizedInput)
  const { hasSpace, noFlags, hasPhrase } = extractFlags(sanitizedInput)
  if (noFlags) {
    return createWordMatch(sanitizedInput)
  }

  if (hasPhrase) {
    // assume everything in phrase
    return createPhraseMatch(sanitizedInput)
  }

  if (hasSpace) {
    let str = ''
    const segments = sanitizedInput.split(' ')
    segments.forEach(word => {
      str = `${str}(?=.*${createWordMatch(word)})`
    })
    return str
  }

  return createWordMatch(sanitizedInput)
}
