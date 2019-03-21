const parseResponse = require('./parseResponse')
const buildBody = require('./buildBody')

module.exports = function createRequestBuilder({ filterFunction, resource }) {
  const buildRequest = testCase => {
    return {
      body: buildBody({
        filterFunction,
        testCase,
      }),
      operationId: 'searchSpecimenQuery',
      validateOutput: false,
    }
  }
  return {
    buildRequest,
    parseResponse: ({ res, testCase }) => {
      return parseResponse({
        res,
        resource,
        testCase,
      })
    },
  }
}
