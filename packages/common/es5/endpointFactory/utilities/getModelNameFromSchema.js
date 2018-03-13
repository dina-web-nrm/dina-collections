'use strict';

module.exports = function getModelNameFromSchema(schema) {
  if (!schema) {
    return null;
  }

  if (!schema.$ref) {
    return null;
  }

  var segments = schema.$ref.split('/');

  return segments[segments.length - 1];
};