const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const logTags = require('./logTags')
const parseResponse = require('./parseResponse')

module.exports = function runTestCases({ buildRequest, testCases }) {
  testCases.forEach(testCase => {
    const {
      compareQueryTypesResult,
      debug,
      only,
      queryTypes = ['dina'],
    } = testCase
    const jestTest = debug || only ? fit : it
    const queryResponses = {}
    queryTypes.forEach(queryType => {
      let queryTypeTestCase = testCase

      if (queryType === 'raw') {
        queryTypeTestCase = {
          ...queryTypeTestCase,
          raw: true,
          title: `${queryTypeTestCase.title} (raw)`,
        }
      } else {
        queryTypeTestCase = {
          ...queryTypeTestCase,
          title: `${queryTypeTestCase.title} (dina)`,
        }
      }

      const {
        aggregate,
        expectedCount,
        snapshot,
        testFn,
        title,
      } = queryTypeTestCase

      jestTest(title, () => {
        const request = buildRequest(queryTypeTestCase)
        /* eslint-disable no-console */
        if (debug) {
          console.log(`${title} - request`, JSON.stringify(request, null, 2))
        }
        return makeTestCall(request).then(res => {
          // console.log(JSON.stringify(res, null, 2))
          const parsedRes = parseResponse({ res, testCase: queryTypeTestCase })
          queryResponses[queryType] = parsedRes.data
          if (debug) {
            console.log(
              `${title} - response`,
              JSON.stringify(parsedRes, null, 2)
            )
            if (aggregate) {
              logTags(parsedRes)
            }
          }

          if (testFn) {
            testFn(parsedRes)
          }
          if (expectedCount !== undefined) {
            expect(parsedRes.data.length).toBe(expectedCount)
          }

          if (snapshot) {
            expect(parsedRes.data).toMatchSnapshot()
          }
        })
        /* eslint-enable no-console */
      })
    })

    if (compareQueryTypesResult && queryTypes.length === 2) {
      jestTest(`${testCase.title} (compare)`, () => {
        console.log(
          'queryResponses.dina',
          JSON.stringify(queryResponses.dina, null, 2)
        )
        console.log(
          'queryResponses.raw',
          JSON.stringify(queryResponses.raw, null, 2)
        )
        expect(queryResponses.dina).toEqual(queryResponses.raw)
      })
    }
  })
}
