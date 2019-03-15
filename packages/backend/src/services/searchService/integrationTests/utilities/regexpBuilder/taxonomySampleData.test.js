const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const testSpecification = require('./testCases/sampleData/taxonomyTags')
const runTests = require('./runTests')

unitDescribe('regexBuilder - taxonomy sample data tests', () => {
  runTests(testSpecification)
})
