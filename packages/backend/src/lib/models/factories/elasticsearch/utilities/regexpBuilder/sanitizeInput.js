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

const escapeDanglingQuotes = str => {
  let isPhrase = false
  if (str.length > 1) {
    isPhrase = str[0] === '"' && str[str.length - 1] === '"'
  }
  return str
    .split('')
    .map((char, index) => {
      if (isPhrase && (index === 0 || index === str.length - 1)) {
        return char
      }
      if (char === '"') {
        return '\\"'
      }
      return char
    })
    .join('')
}

const escapeDots = str => {
  return str.replace(/\.+/g, '\\.')
}

module.exports = function sanitizeInput(input) {
  let str = removeDoubleBlanks(input)
  str = removeFirstEqualIfIsPhrase(str)
  str = escapeDanglingQuotes(str)
  str = escapeDots(str)
  return str
}
