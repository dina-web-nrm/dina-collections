'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function decorateAdditionalProperties(originalError) {
  var error = originalError.params.errors ? originalError.params.errors[0] : originalError;

  var rootPath = error.dataPath;
  var property = error.params.missingProperty ? '/' + error.params.missingProperty : '';
  var fullPath = ('' + rootPath + property).replace(/\//g, '.').substring(1);

  if (error.parentSchema && error.parentSchema.type === 'array') {
    fullPath += '._error';
  }

  return (0, _extends3.default)({}, error, {
    fullPath: fullPath,
    originalError: originalError,
    property: property
  });
};