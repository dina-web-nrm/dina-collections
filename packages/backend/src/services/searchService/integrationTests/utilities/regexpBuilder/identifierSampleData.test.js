const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testSpecification = require('./testCases/sampleData/identifierTags')
const runTests = require('./runTests')

unitDescribe('regexBuilder - identifier sample data tests', () => {
  runTests(testSpecification)
})
