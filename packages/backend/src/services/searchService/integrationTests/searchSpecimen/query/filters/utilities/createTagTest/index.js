const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../../../../utilities/test/waitForApiRestart')
const runTests = require('./runTests')

module.exports = function createTagTest({
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
  const aggregationFunction =
    aggregationType === 'tagTypes'
      ? typeAggregationFunction
      : valueAggregationFunction

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
    runTests({ resource, testSpecification, filterType })
  })
}
