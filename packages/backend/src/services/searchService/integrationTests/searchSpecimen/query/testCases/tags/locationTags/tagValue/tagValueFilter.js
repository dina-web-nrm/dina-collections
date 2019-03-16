const createQueryTestCasedFromRegexpCases = require('../../../../../../utilities/createQueryTestCasedFromRegexpCases')
const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/locationTags')

const regexpTestCases = createQueryTestCasedFromRegexpCases(
  regexpBuilderSampleDataTaxonomyTestSpecification
)

module.exports = [...regexpTestCases]
