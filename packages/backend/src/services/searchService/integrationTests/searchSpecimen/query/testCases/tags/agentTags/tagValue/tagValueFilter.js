const createQueryTestCasedFromRegexpCases = require('../../../../../../utilities/createQueryTestCasedFromRegexpCases')
const regexpBuilderSampleDataTaxonomyTestSpecification = require('../../../../../../utilities/regexpBuilder/testCases/sampleData/agentTags')

const regexpTestCases = createQueryTestCasedFromRegexpCases(
  regexpBuilderSampleDataTaxonomyTestSpecification
)

module.exports = [...regexpTestCases]
