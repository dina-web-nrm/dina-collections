module.exports = function extractFlags(input) {
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
