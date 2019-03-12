const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const logTags = require('./logTags')

module.exports = function runTestCases({ buildRequest, testCases }) {
  testCases.forEach(testCase => {
    const {
      aggregate,
      debug,
      expectedCount,
      snapshot,
      testFn,
      title,
    } = testCase
    const jestTest = debug ? fit : it

    jestTest(title, () => {
      const request = buildRequest(testCase)
      /* eslint-disable no-console */
      if (debug) {
        console.log(`${title} - request`, JSON.stringify(request, null, 2))
      }
      return makeTestCall(request).then(res => {
        if (debug) {
          console.log(`${title} - response`, JSON.stringify(res, null, 2))
          if (aggregate) {
            logTags(res)
          }
        }

        if (testFn) {
          testFn(res)
        }
        if (expectedCount !== undefined) {
          expect(res.data.length).toBe(expectedCount)
        }

        if (snapshot) {
          expect(res.data).toMatchSnapshot()
        }
      })
      /* eslint-enable no-console */
    })
  })
}
