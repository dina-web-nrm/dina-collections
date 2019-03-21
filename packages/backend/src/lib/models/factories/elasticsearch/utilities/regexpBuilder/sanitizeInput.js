const removeDoubleBlanks = str => {
  return str.replace(/\s\s+/g, ' ')
}

const removeFirstEqualIfIsPhrase = str => {
  if (str.length < 3) {
    return str
  }

  if (str[0] === '=' && str[1] === '"' && str[str.length - 1] === '"') {
    return str.slice(1)
  }
  return str
}

module.exports = function sanitizeInput(input) {
  let str = removeDoubleBlanks(input)
  str = removeFirstEqualIfIsPhrase(input)
  return str
}
