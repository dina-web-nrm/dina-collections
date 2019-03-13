const buildRawBody = require('./buildRawBody')
const buildBody = require('./buildBody')

module.exports = function createRequestBuilder({
  aggregationFunction,
  filterFunction,
  tagPath,
}) {
  return function buildRequest(testCase) {
    return {
      body: testCase.raw
        ? buildRawBody({
            tagPath,
            testCase,
          })
        : buildBody({
            aggregationFunction,
            filterFunction,
            testCase,
          }),
      operationId: 'searchSpecimenQuery',
      validateOutput: false,
    }
  }
}
