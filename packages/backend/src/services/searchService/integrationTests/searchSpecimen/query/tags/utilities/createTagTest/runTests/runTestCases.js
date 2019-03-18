const makeRequest = require('./makeRequest')
const createTestCaseTests = require('./createTestCaseTests')

module.exports = function runTestCases({ requestBuilder, testCases, onlySet }) {
  testCases.forEach(testCase => {
    const {
      compareQueryResults = false,
      only = false,
      queryTypes = ['raw'],
      skip = false,
    } = testCase
    let jestDescribe = describe
    if (only) {
      jestDescribe = describe.only
    }
    if (skip) {
      jestDescribe = describe.skip
    }
    const queryResponses = {}
    queryTypes.forEach(queryType => {
      const queryTypeTestCase = testCase

      describe(queryType, () => {
        const { title } = queryTypeTestCase

        jestDescribe(title, () => {
          let res
          let err
          const getResponse = () => {
            return res
          }
          const getError = () => {
            return err
          }
          beforeAll(() => {
            if (onlySet && !only) {
              return null
            }
            return makeRequest({
              raw: queryType === 'raw',
              requestBuilder,
              testCase,
            }).then(output => {
              /* eslint-disable prefer-destructuring */
              err = output.err
              res = output.res
              /* eslint-enable prefer-destructuring */
            })
          })

          createTestCaseTests({
            getError,
            getResponse,
            testCase: queryTypeTestCase,
          })
        })
      })
    })

    if (compareQueryResults && queryTypes.length === 2) {
      jestDescribe('test', () => {
        it(`${testCase.title} (compare)`, () => {
          expect(queryResponses.dina).toEqual(queryResponses.raw)
        })
      })
    }
  })
}
