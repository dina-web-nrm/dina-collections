'use strict';

module.exports = function getModelNameFromParameter(_ref) {
  var schema = _ref.schema;

  if (!schema) {
    return null;
  }

  var segments = schema.$ref.split('/');

  return segments[segments.length - 1];
};