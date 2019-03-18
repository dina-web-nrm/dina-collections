const writeTestLog = require('../../writeTestLog')
const runTestCases = require('./runTestCases')
const createRequestBuilder = require('./requestBuilder')
const onlySetInTestSpecification = require('./onlySetInTestSpecification')

const print = false
module.exports = function runApiTagTests({ testSpecification, filterType }) {
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

  const headers = ['input', 'filter', 'expectedCount']
  const testLogObject = {
    [filterType]: [],
  }

  afterAll(() => {
    if (print) {
      writeTestLog({
        headers,
        resource,
        testLogObject,
        type: filterType,
      })
    }
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
    onlySet,
    requestBuilder,
    storeTestLog,
    testCases,
  })
}
