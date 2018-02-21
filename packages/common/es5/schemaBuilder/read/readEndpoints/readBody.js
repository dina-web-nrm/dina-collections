'use strict';

var readParameterFromJsonFile = require('../utilities/readParameterFromJsonFile');

module.exports = function readBody(_ref) {
  var endpointName = _ref.endpointName,
      endpointPath = _ref.endpointPath;

  var schema = readParameterFromJsonFile({
    basePath: endpointPath,
    parameterName: 'request'
  });

  if (!schema) {
    return null;
  }

  var name = endpointName + 'Request';

  return {
    name: name,
    schema: schema
  };
};