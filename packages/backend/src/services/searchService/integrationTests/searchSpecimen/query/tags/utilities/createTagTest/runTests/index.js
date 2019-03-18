const runTestCases = require('./runTestCases')
const createRequestBuilder = require('./requestBuilder')
const onlySetInTestSpecification = require('./onlySetInTestSpecification')

module.exports = function runApiTagTests(testSpecification) {
  const onlySet = onlySetInTestSpecification(testSpecification)

  const {
    aggregationFunction,
    aggregationType,
    filterFunction,
    resource,
    tagPath,
    testCases,
  } = testSpecification

  const requestBuilder = createRequestBuilder({
    aggregationFunction,
    aggregationType,
    filterFunction,
    resource,
    tagPath,
  })

  runTestCases({
    onlySet,
    requestBuilder,
    testCases,
  })
}
