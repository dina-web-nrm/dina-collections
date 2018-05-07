'use strict';

var buildResponses = require('./buildResponses');
var buildParameters = require('./buildParameters');
var buildRequest = require('./buildRequest');

module.exports = function buildPath(endpoint) {
  var description = endpoint.description,
      errors = endpoint.errors,
      headers = endpoint.headers,
      operationId = endpoint.operationId,
      pathParams = endpoint.pathParams,
      queryParams = endpoint.queryParams,
      request = endpoint.request,
      response = endpoint.response,
      security = endpoint.security,
      summary = endpoint.summary,
      tags = endpoint.tags;

  var responses = buildResponses({ errors: errors, operationId: operationId, response: response });
  var requestBody = buildRequest({ operationId: operationId, request: request });
  var parameters = buildParameters({
    headers: headers,
    pathParams: pathParams,
    queryParams: queryParams
  });
  return {
    description: description,
    operationId: operationId,
    parameters: parameters,
    requestBody: requestBody,
    responses: responses,
    security: security,
    summary: summary,
    tags: tags
  };
};