const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const logTags = require('./logTags')

/**
 * Run a number of test cases
 * @param {Object[]} requestBuilder - A request builder created with ./requestBuilder
 * @param {Object[]} testCases - An array with test cases
 * @param {boolean} [testCases[].aggregate = false] - If the result should be aggregated or not
 * @param {boolean} [testCases[].compareQueryTypesResult = false] - Only relevant if 2 queryTypes provided. Will compare the result from the different queryTypes
 * @param {number} [testCases[].expectedCount = false] - If provided will test that number of items return is expectedCount
 * @param {boolean} [testCases[].only = false] - If true only this test will be run
 * @param {boolean} [testCases[].printRequest = false] - If true the request will be logged to console
 * @param {boolean} [testCases[].printResponse = false] - If true the response will be logged to console
 * @param {array} [testCases[].queryTypes = ["dina"]] - Will run one test for each query type. Allowed types: [dina, raw]. Dina corresponds to the dina query dsl while raw will create a raw elastic query
 * @param {boolean} [testCases[].snapshot = false] - If true a snapshot test will be added
 * @param {array} [testCases[].tagTypes = []] - Will create filters for provided tagTypes
 * @param {string} [testCases[].tagValue = undefined] - Will create filters for provided tagValue
 * @param {string} testCases[].title - The title of the test. Will be suffixed with dina or raw when testing the different queryTypes
 *
 */
module.exports = function runTestCases({ requestBuilder, testCases }) {
  testCases.forEach(testCase => {
    const { compareQueryTypesResult, only, queryTypes = ['dina'] } = testCase
    const jestTest = only ? fit : it
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
        printRequest,
        printResponse,
        snapshot,
        testFn,
        title,
      } = queryTypeTestCase

      jestTest(title, () => {
        const request = requestBuilder.buildRequest(queryTypeTestCase)
        /* eslint-disable no-console */
        if (printRequest) {
          console.log(`${title} - request`, JSON.stringify(request, null, 2))
        }
        return makeTestCall(request).then(res => {
          // console.log(JSON.stringify(res, null, 2))
          const parsedRes = requestBuilder.parseResponse({
            res,
            testCase: queryTypeTestCase,
          })
          queryResponses[queryType] = parsedRes.data
          if (printResponse) {
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
        expect(queryResponses.dina).toEqual(queryResponses.raw)
      })
    }
  })
}
