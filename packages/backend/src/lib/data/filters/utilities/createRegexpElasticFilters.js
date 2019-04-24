const {
  factory: createRegexpBuilder,
} = require('../../../models/elasticsearch/utilities/regexpBuilder')

const buildRegexp = createRegexpBuilder({ env: 'elastic', throwOnError: false })

module.exports = function createRegexpElasticFilter({ path, value }) {
  const regexpStringArray = buildRegexp(value)
  return regexpStringArray.map(regexpString => {
    return {
      regexp: {
        [path]: regexpString,
      },
    }
  })
}
