const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../../../../utilities/test/waitForApiRestart')
const runTests = require('./runTests')

module.exports = function createAggregationTest({
  aggregationFunction: aggregationFunctionInput,
  aggregationType,
  description: customDescription,
  filterFunction,
  filterType,
  resource,
  tagPath,
  testCases,
  typeAggregationFunction,
  valueAggregationFunction,
}) {
  // console.log('aggregationFunction', aggregationFunction)
  const aggregationFunction =
    aggregationFunctionInput ||
    (aggregationType === 'tagTypes'
      ? typeAggregationFunction
      : valueAggregationFunction)

  const testSpecification = {
    aggregationFunction,
    aggregationType,
    filterFunction,
    resource,
    tagPath,
    testCases,
  }

  const description =
    customDescription ||
    `searchSpecimen - ${[resource, aggregationType, filterType]
      .filter(str => {
        return !!str
      })
      .join(' - ')}`
  apiSampleDescribe(description, () => {
    hook(beforeAll, () => {
      return waitForApiRestart()
    })
    runTests({ filterType, resource, testSpecification })
  })
}
