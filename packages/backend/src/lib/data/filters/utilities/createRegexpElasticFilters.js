const {
  factory: createRegexpBuilder,
} = require('../../../models/factories/elasticsearch/utilities/regexpBuilder')

const buildRegexp = createRegexpBuilder({ env: 'elastic' })

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
