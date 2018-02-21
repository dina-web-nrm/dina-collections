'use strict';

var readParameterFromJsonFile = require('../utilities/readParameterFromJsonFile');

module.exports = function readResponse(_ref) {
  var endpointName = _ref.endpointName,
      endpointPath = _ref.endpointPath;

  var schema = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'response'
  });

  if (!schema) {
    return null;
  }
  var name = endpointName + 'Response';

  return {
    name: name,
    schema: schema
  };
};