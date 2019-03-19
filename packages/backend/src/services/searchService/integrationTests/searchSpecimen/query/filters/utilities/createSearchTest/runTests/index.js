const logResponse = require('./logResponse')
const writeTestLog = require('../../writeTestLog')
const runTestCases = require('../../runTestCases')
const createRequestBuilder = require('./requestBuilder')
const createTestCaseTests = require('./createTestCaseTests')

module.exports = function runApiSearchTests({ testSpecification, searchType }) {
  const { fieldPath, filterFunction, resource, testCases } = testSpecification

  const requestBuilder = createRequestBuilder({
    fieldPath,
    filterFunction,
    resource,
  })

  const headers = ['input', 'filter', 'expectedCount', 'matchingCatalogNumbers']
  const testLogObject = {
    [searchType]: [],
  }

  afterAll(() => {
    writeTestLog({
      group: resource,
      headers,
      name: searchType,
      testLogObject,
    })
  })
  const storeTestLog = testCase => {
    const { title, filters = {}, expect = {} } = testCase

    const filterString = Array.isArray(filters)
      ? `\`\`\`${JSON.stringify(filters)}\`\`\``
      : Object.keys(filters)
          .map(key => {
            return `${key}: ${filters[key]}`
          })
          .join(', ')

    let expectedCount = ''
    const matchingCatalogNumbers = []
    if (expect.count) {
      expectedCount = expect.count
    } else if (expect.items) {
      expectedCount = expect.items.length
    }
    if (expect.items) {
      expect.items.forEach(item => {
        if (item.catalogNumber) {
          matchingCatalogNumbers.push(item.catalogNumber)
        }
      })
    }

    testLogObject[searchType].push([
      title,
      filterString,
      expectedCount,
      matchingCatalogNumbers.join('<br>'),
    ])
  }

  runTestCases({
    createTestCaseTests,
    defaultQueryTypes: ['dina'],
    logResponse,
    requestBuilder,
    storeTestLog,
    testCases,
  })
}
