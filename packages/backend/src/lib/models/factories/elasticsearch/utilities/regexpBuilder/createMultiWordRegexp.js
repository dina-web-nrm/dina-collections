const extractFlags = require('./extractFlags')
const createWordRegexp = require('./createWordRegexp')

module.exports = function createMultiWordRegexp(input) {
  const { hasEqual } = extractFlags(input)
  const segments = input.split(' ')
  return segments.map((word, index) => {
    return [
      createWordRegexp({ firstWord: index === 0, hasEqual, input: word }),
    ].join('')
  })
}
