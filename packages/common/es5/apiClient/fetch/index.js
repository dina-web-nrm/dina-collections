'use strict';

var createBody = require('./createBody');
var createUrl = require('./createUrl');
var parseResponse = require('./parseResponse');

module.exports = function wrappedFetch(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      methodConfig = _ref.methodConfig,
      request = _ref.request;
  var method = methodConfig.method;
  var body = request.body,
      headers = request.headers;


  var formattedBody = createBody({
    body: body,
    headers: headers
  });

  var url = createUrl({
    apiConfig: apiConfig,
    endpointConfig: endpointConfig,
    methodConfig: methodConfig,
    request: request
  });

  return fetch(url, {
    body: formattedBody,
    headers: headers,
    method: method
  }).then(parseResponse);
};