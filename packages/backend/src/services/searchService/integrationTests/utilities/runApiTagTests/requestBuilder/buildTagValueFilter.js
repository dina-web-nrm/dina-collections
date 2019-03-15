const { factory: createRegexpBuilder } = require('../../regexpBuilder')

const buildRegexp = createRegexpBuilder({ env: 'elastic' })

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
