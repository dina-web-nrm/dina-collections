const buildRegexpInternal = require('./buildRegexp')

module.exports = function createRegexpBuilder({
  env = 'js',
  throwOnError = true,
} = {}) {
  return function buildRegexp(input) {
    return buildRegexpInternal({ env, input, throwOnError })
  }
}
