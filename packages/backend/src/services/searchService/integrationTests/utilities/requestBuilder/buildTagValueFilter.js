const regexpBuilder = require('./buildRegexp')

const buildRegexp = regexpBuilder({ env: 'elastic' })

module.exports = function buildTagValueFilter({
  tagValuePath,
  tagValue,
  useRegexp,
}) {
  if (!useRegexp) {
    return [
      {
        wildcard: {
          [tagValuePath]: tagValue,
        },
      },
    ]
  }

  const regexpStringArray = buildRegexp(tagValue)
  return regexpStringArray.map(regexpString => {
    return {
      regexp: {
        [tagValuePath]: regexpString,
      },
    }
  })
}
