const { hook } = require('common/src/testUtilities/envUnit')
const writeTestLog = require('../../writeTestLog')
const runTestCases = require('./runTestCases')

module.exports = function runTests({ testSpecification, resource }) {
  const headers = ['input', 'regexp', 'testString', 'matching', 'errorMessage']
  const testLogObject = {}

  hook(afterAll, () => {
    writeTestLog({
      group: resource,
      headers,
      name: 'unit',
      testLogObject,
    })
  })
  Object.keys(testSpecification).forEach(testGroupKey => {
    const { testCases, title = testGroupKey } = testSpecification[testGroupKey]
    testLogObject[title] = []

    describe(title, () => {
      const storeTestLog = ({
        errorMessage = '',
        input = '',
        matching = '',
        regexp = '',
        string = '',
      }) => {
        testLogObject[title].push([
          input,
          regexp && `\`\`\` ${regexp} \`\`\``,
          string,
          matching,
          errorMessage,
        ])
      }

      runTestCases({
        storeTestLog,
        testCases,
      })
    })
  })
}
