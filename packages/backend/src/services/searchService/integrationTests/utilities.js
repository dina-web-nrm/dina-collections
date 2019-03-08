const { makeTestCall } = require('../../../utilities/test/testApiClient')
/* eslint-disable import/no-extraneous-dependencies */
require('console.table')
/* eslint-enable import/no-extraneous-dependencies */

exports.createRequestBuilder = ({ aggregationFunction, filterFunction }) => {
  const buildBody = ({
    tagTypes = undefined,
    tagValue,
    aggregate = false,
    limit = 100,
    filter = false,
  }) => {
    let aggregations = []
    let query = {}

    if (aggregate) {
      aggregations = [
        {
          aggregationFunction,
          input: {
            limit,
            tagTypes,
            tagValue,
          },
        },
      ]
    }

    if (filter) {
      query = {
        and: [
          {
            filter: {
              filterFunction,
              input: { tagTypes, tagValue },
            },
          },
        ],
      }
    }

    return {
      data: {
        attributes: {
          aggregations,
          limit,
          query,
        },
      },
    }
  }

  return function buildRequest(options) {
    return {
      body: buildBody(options),
      operationId: 'searchSpecimenQuery',
      validateOutput: false,
    }
  }
}

exports.tagTypeEquals = expectedType => {
  return res => {
    res.data.forEach(item => {
      expect(item.attributes.tagType).toBe(expectedType)
    })
    return res
  }
}

exports.chain = testFunctions => {
  return res => {
    testFunctions.forEach(testFunction => {
      return testFunction(res)
    })
  }
}

exports.logTags = res => {
  const log = res.data.map(item => {
    return {
      id: item.id,
      tagType: item.attributes.tagType,
      tagValue: item.attributes.tagValue,
    }
  })

  /* eslint-disable no-console */
  console.table(log)
  /* eslint-enable no-console */
}

exports.runTestCases = ({ buildRequest, testCases }) => {
  testCases.forEach(testCase => {
    const {
      aggregate,
      debug,
      expectedCount,
      snapshot,
      testFn,
      title,
    } = testCase
    const jestTest = debug ? fit : it

    jestTest(title, () => {
      const request = buildRequest(testCase)
      /* eslint-disable no-console */
      if (debug) {
        console.log(`${title} - request`, JSON.stringify(request, null, 2))
      }
      return makeTestCall(request).then(res => {
        if (debug) {
          console.log(`${title} - response`, JSON.stringify(res, null, 2))
          if (aggregate) {
            exports.logTags(res)
          }
        }

        if (testFn) {
          testFn(res)
        }
        if (expectedCount !== undefined) {
          expect(res.data.length).toBe(expectedCount)
        }

        if (snapshot) {
          expect(res.data).toMatchSnapshot()
        }
      })
      /* eslint-enable no-console */
    })
  })
}
