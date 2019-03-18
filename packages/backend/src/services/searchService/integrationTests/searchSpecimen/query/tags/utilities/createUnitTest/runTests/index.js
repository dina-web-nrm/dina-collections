/* eslint-disable no-console, sort-keys */
const runTestCases = require('./runTestCases')

const print = false
module.exports = function runTests(testSpecification) {
  const testLog = []
  const storeTestLog = ({
    errorMessage = '',
    input = '',
    matching = '',
    regexp = '',
    string = '',
  }) => {
    testLog.push({
      input,
      string,
      matching,
      regexp,
      errorMessage,
    })
  }

  afterAll(() => {
    if (print) {
      console.table(testLog)
    }
  })

  Object.keys(testSpecification).forEach(testGroupKey => {
    const { testCases, title = testGroupKey } = testSpecification[testGroupKey]

    describe(title, () => {
      runTestCases({
        storeTestLog,
        testCases,
      })
    })
  })
}
