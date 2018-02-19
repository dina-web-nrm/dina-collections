'use strict';

var buildResponses = require('./buildResponses');
var buildParameters = require('./buildParameters');

module.exports = function buildPath(endpoint) {
  var description = endpoint.description,
      headers = endpoint.headers,
      operationId = endpoint.operationId,
      pathParams = endpoint.pathParams,
      queryParams = endpoint.queryParams,
      request = endpoint.request,
      response = endpoint.response,
      summary = endpoint.summary,
      tags = endpoint.tags;

  var responses = buildResponses({ operationId: operationId, response: response });
  var parameters = buildParameters({
    headers: headers,
    pathParams: pathParams,
    queryParams: queryParams,
    request: request
  });

  return {
    description: description,
    operationId: operationId,
    parameters: parameters,
    responses: responses,
    summary: summary,
    tags: tags
  };
};