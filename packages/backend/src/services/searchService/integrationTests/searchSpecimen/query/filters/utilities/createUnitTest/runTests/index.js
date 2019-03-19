const writeTestLog = require('../../writeTestLog')
const runTestCases = require('./runTestCases')

const print = true
module.exports = function runTests({ testSpecification, resource }) {
  const headers = ['input', 'string', 'matching', 'regexp', 'errorMessage']
  const testLogObject = {}

  afterAll(() => {
    if (print) {
      writeTestLog({
        headers,
        resource,
        testLogObject,
      })
    }
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
          string,
          matching,
          regexp,
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
