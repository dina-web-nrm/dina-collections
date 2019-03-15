const runTestCases = require('./runTestCases')
const createRequestBuilder = require('./requestBuilder')
const onlySetInTestSpecification = require('./onlySetInTestSpecification')

module.exports = function runApiTagTests(testSpecification) {
  const onlySet = onlySetInTestSpecification(testSpecification)
  Object.keys(testSpecification).forEach(testGroupKey => {
    const {
      aggregationFunction,
      aggregationType,
      filterFunction,
      resource,
      tagPath,
      testCases,
      title = testGroupKey,
    } = testSpecification[testGroupKey]

    const requestBuilder = createRequestBuilder({
      aggregationFunction,
      aggregationType,
      filterFunction,
      resource,
      tagPath,
      useRegexp: true,
    })

    describe(title, () => {
      runTestCases({
        onlySet,
        requestBuilder,
        testCases,
      })
    })
  })
}
