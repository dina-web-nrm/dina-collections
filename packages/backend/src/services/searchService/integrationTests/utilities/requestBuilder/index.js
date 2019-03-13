const parseResponse = require('./parseResponse')
const buildRawBody = require('./buildRawBody')
const buildBody = require('./buildBody')

/**
 * Create a request builder
 * @param {string} aggregationFunction - The name of the aggregationFunction used by backend, when queryType is dina, to aggregate result
 * @param {string} aggregationType - The type of aggregation used when queryType is raw. One of [tagTypes, tagVatlues]
 * @param {string} filterFunction - The name of the filterFunction used by backend, when queryType is dina, to filter result
 * @param {string} resource - The name of the aggregated resource returned in the response.
 * @param {string} tagPath - The path to the tag. Used when queryType is raw. Ex attributes.tags.identifierTags

 * @returns {Object} requestBuilder
 *
 */
module.exports = function createRequestBuilder({
  aggregationFunction,
  aggregationType,
  filterFunction,
  resource,
  tagPath,
}) {
  const buildRequest = testCase => {
    return {
      body: testCase.raw
        ? buildRawBody({
            aggregationType,
            resource,
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
  return {
    buildRequest,
    parseResponse: ({ res, testCase }) => {
      return parseResponse({
        aggregationType,
        res,
        resource,
        testCase,
      })
    },
  }
}
