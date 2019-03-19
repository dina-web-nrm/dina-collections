const {
  describe: apiSampleDescribe,
  hook,
} = require('common/src/testUtilities/envBackendApiSampleData')
const waitForApiRestart = require('../../../../../../../../utilities/test/waitForApiRestart')
const runTests = require('./runTests')

module.exports = function createSearchTest({
  description: customDescription,
  fieldPath,
  filterFunction,
  filterType,
  resource,
  searchType = 'search',
  testCases,
}) {
  const testSpecification = {
    fieldPath,
    filterFunction,
    resource,
    testCases,
  }

  const description =
    customDescription ||
    `searchSpecimen - ${[resource, searchType, filterType]
      .filter(str => {
        return !!str
      })
      .join(' - ')}`
  apiSampleDescribe(description, () => {
    hook(beforeAll, () => {
      return waitForApiRestart()
    })
    runTests({ resource, searchType, testSpecification })
  })
}
