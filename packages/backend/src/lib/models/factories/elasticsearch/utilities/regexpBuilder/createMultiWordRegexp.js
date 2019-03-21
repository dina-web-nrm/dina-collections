const createWordRegexp = require('./createWordRegexp')
const { MATCH_ANY } = require('./constants')

module.exports = function createMultiWordRegexp(input) {
  const segments = input.split(' ')
  return segments.map(word => {
    return [MATCH_ANY, createWordRegexp(word)].join('')
  })
}
