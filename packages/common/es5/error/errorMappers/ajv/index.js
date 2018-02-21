'use strict';

var decorateAdditionalProperties = require('./decorateAdditionalProperties');
var transform = require('./transform');

module.exports = function apiErrorMapper(ajvErrors) {
  if (!ajvErrors) {
    return ajvErrors;
  }
  return ajvErrors.map(decorateAdditionalProperties).map(transform);
};