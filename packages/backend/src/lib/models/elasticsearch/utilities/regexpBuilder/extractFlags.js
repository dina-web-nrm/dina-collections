module.exports = function extractFlags(input) {
  let hasSpace = false
  let hasEqual = false
  let hasStar = false
  let hasPhrase = false
  let hasFieldEqual = false
  if (input.includes(' ')) {
    hasSpace = true
  }

  if (input.indexOf('==') === 0) {
    hasFieldEqual = true
  }

  if (!hasFieldEqual && input.indexOf('=') === 0) {
    hasEqual = true
  }

  if (input.includes('*')) {
    hasStar = true
  }

  if (input.length > 2) {
    if (input[0] === '"' && input[input.length - 1] === '"') {
      hasPhrase = true
    }
  }

  return {
    hasEqual,
    hasFieldEqual,
    hasPhrase,
    hasSpace,
    hasStar,
    noFlags: !(hasSpace || hasEqual || hasStar || hasPhrase || hasFieldEqual),
  }
}
