const buildRegexp = require('./buildRegexp')

module.exports = function buildTagValueFilter({
  tagValuePath,
  tagValue,
  useRegexp,
}) {
  if (!useRegexp) {
    return {
      wildcard: {
        [tagValuePath]: tagValue,
      },
    }
  }

  return {
    regexp: {
      [tagValuePath]: buildRegexp(tagValue),
    },
  }
}
