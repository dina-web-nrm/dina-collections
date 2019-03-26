const { hook } = require('common/src/testUtilities/envBackendApiSampleData')
const onlySetInTestSpecification = require('./onlySetInTestSpecification')
const makeRequest = require('./makeRequest')

module.exports = function runTestCases({
  createTestCaseTests,
  defaultQueryTypes = ['dina'],
  logResponse,
  preprocessItems,
  requestBuilder,
  storeTestLog,
  testCases,
}) {
  const onlySet = onlySetInTestSpecification(testCases)
  testCases.forEach(testCase => {
    const {
      compareQueryResults = false,
      only = false,
      queryTypes = defaultQueryTypes,
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
          hook(beforeAll, () => {
            if (onlySet && !only) {
              return null
            }
            storeTestLog(testCase)
            return makeRequest({
              logResponse,
              raw: queryType === 'raw',
              requestBuilder,
              testCase,
            }).then(output => {
              /* eslint-disable prefer-destructuring */
              err = output.err
              if (preprocessItems && output.res && output.res.data) {
                res = {
                  ...output.res,
                  data: preprocessItems(output.res.data),
                }
              } else {
                res = output.res
              }

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
