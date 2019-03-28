const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../../../../utilities/test/waitForApiRestart')
const resetElasticSpecimenIndex = require('../../../../../../../../utilities/test/db/resetElasticSpecimenIndex')
const runTests = require('./runTests')

module.exports = function createAggregationTest({
  aggregationFunction: aggregationFunctionInput,
  aggregationType,
  description: customDescription,
  fieldPath,
  filterFunction,
  filterType,
  preprocessItems,
  resource,
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
    fieldPath,
    filterFunction,
    preprocessItems,
    resource,
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
      return waitForApiRestart().then(() => {
        return resetElasticSpecimenIndex()
      })
    })
    runTests({ filterType, resource, testSpecification })
  })
}
