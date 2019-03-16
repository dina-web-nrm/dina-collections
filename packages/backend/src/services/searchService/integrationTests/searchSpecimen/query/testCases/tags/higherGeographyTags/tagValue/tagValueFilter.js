const createQueryTestCasedFromRegexpCases = require('../../../../../../utilities/createQueryTestCasedFromRegexpCases')
const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/higherGeographyTags')

const regexpTestCases = createQueryTestCasedFromRegexpCases(
  regexpBuilderSampleDataTaxonomyTestSpecification
)

module.exports = [...regexpTestCases]
