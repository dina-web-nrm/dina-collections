const createQueryTestCasedFromRegexpCases = require('../../../../../../utilities/createQueryTestCasedFromRegexpCases')
const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/storageLocationTags')

const regexpTestCases = createQueryTestCasedFromRegexpCases(
  regexpBuilderSampleDataTaxonomyTestSpecification
)

module.exports = [...regexpTestCases]
