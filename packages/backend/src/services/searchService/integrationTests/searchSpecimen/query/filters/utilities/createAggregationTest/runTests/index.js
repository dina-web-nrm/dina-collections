const { hook } = require('common/src/testUtilities/envBackendApiSampleData')
const logResponse = require('./logResponse')
const writeTestLog = require('../../writeTestLog')
const runTestCases = require('../../runTestCases')
const createRequestBuilder = require('./requestBuilder')
const createTestCaseTests = require('./createTestCaseTests')

module.exports = function runApiTagTests({ testSpecification, filterType }) {
  const {
    aggregationFunction,
    aggregationType,
    fieldPath,
    filterFunction,
    preprocessItems,
    resource,
    testCases,
  } = testSpecification

  const requestBuilder = createRequestBuilder({
    aggregationFunction,
    aggregationType,
    fieldPath,
    filterFunction,
    resource,
  })

  const headers = ['input', 'filter', 'expectedCount']
  const testLogObject = {
    [filterType]: [],
  }

  hook(afterAll, () => {
    writeTestLog({
      group: resource,
      headers,
      name: filterType
        ? `${aggregationType}/${filterType}Filter`
        : aggregationType,
      testLogObject,
    })
  })
  const storeTestLog = testCase => {
    const { title, filters = {}, expect = {} } = testCase

    const filterString = Object.keys(filters)
      .map(key => {
        return `${key}: ${filters[key]}`
      })
      .join(', ')

    let expectedCount = ''

    if (expect.count) {
      expectedCount = expect.count
    } else if (expect.items) {
      expectedCount = expect.items.length
    }

    testLogObject[filterType].push([title, filterString, expectedCount])
  }

  runTestCases({
    createTestCaseTests,
    logResponse,
    preprocessItems,
    requestBuilder,
    storeTestLog,
    testCases,
  })
}
