const {
  factory: createRegexpBuilder,
} = require('../../../../../../../../../../lib/models/factories/elasticsearch/utilities/regexpBuilder')

const buildRegexp = createRegexpBuilder({ env: 'elastic' })

module.exports = function buildTagValueFilter({ tagValuePath, tagValue }) {
  const regexpStringArray = buildRegexp(tagValue)
  return regexpStringArray.map(regexpString => {
    return {
      regexp: {
        [tagValuePath]: regexpString,
      },
    }
  })
}
